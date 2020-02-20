import superagent from 'superagent'
import url from '@/utils/url'
import wrap from '@/utils/wrap'
import GenericModel from '@/models/GenericModel'
import SchemaManager from '@/SchemaManager'
import EmittedError from '@/errors/EmittedError'

export default {
  name: 'Postgrest',
  props: {
    route: {
      type: String,
      required: true
    },
    apiRoot: {
      type: String,
      default: ''
    },
    query: {
      type: Object,
      default: undefined
    },
    create: {
      type: Object,
      default: undefined
    },
    single: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: undefined
    },
    offset: {
      type: Number,
      default: undefined
    },
    exactCount: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      items: [],
      item: {},
      newItem: new GenericModel(this.create),
      range: undefined,
      get: wrap(this._get),
      primaryKeys: undefined
    }
  },
  computed: {
    scope () {
      return {
        get: this.query !== undefined ? this.get : undefined,
        items: (this.query !== undefined && !this.single) ? this.items : undefined,
        item: (this.query !== undefined && this.single) ? this.item : undefined,
        newItem: this.create !== undefined ? this.newItem : undefined,
        range: this.range,
        rpc: this.rpc
      }
    },
    url () {
      return this.apiRoot + this.route
    }
  },
  methods: {
    async request (method, query = {}, opts = {}, data) {
      const headers = {
        'Accept': opts.single ? 'application/vnd.pgrst.object+json' : 'application/json'
      }
      if (opts.limit || opts.offset) {
        const range = [opts.offset || 0, opts.limit || null]
        if (range[1] && opts.offset) range[1] += opts.offset
        headers['Range-Unit'] = 'items'
        headers.Range = range.join('-')
      }
      headers.Prefer = opts.representation ? 'return=representation' : 'return=minimal'
      if (opts.exactCount) {
        headers.Prefer = headers.Prefer + ',count=exact'
      }

      // add instance query (for vertical filtering etc.)
      const q = Object.assign({}, this.query || {}, query)
      const reqUrl = opts.root ? (opts.route ? this.apiRoot + opts.route : this.apiRoot) : this.apiRoot + url({ [opts.route || this.route]: q })
      return superagent(method, reqUrl)
        .set(headers)
        .send(data)
    },
    async _get () {
      try {
        if (!this.query) {
          return
        }
        const resp = await this.request('GET', this.query, {
          single: this.single,
          limit: this.limit,
          offset: this.offset,
          exactCount: this.exactCount
        })

        if (this.single) {
          this.items = null
          this.item = resp && resp.body ? new GenericModel(resp.body, this.request, this.primaryKeys) : {}
        } else {
          this.item = null
          this.items = resp && resp.body ? resp.body.map(item => {
            return new GenericModel(item, this.request, this.primaryKeys)
          }) : []
        }

        if (resp && resp.headers['Content-Range']) {
          let contentRange = resp.headers['Content-Range'].split('/')
          let range = contentRange[0].split('-')
          this.range = {
            totalCount: contentRange[1] === '*' ? undefined : parseInt(contentRange[1]),
            first: parseInt(range[0]),
            last: parseInt(range[1])
          }
        } else {
          this.range = undefined
        }
      } catch (e) {
        this.$emit('get-error', e)
        throw new EmittedError(e)
      }
    },
    async rpc (fn, method = 'POST', args = {}) {
      if (!['POST', 'GET'].includes(method)) {
        throw new Error('RPC endpoint only supports "POST" and "GET" methods.')
      }
      return this.request(method, {}, { root: true, route: 'rpc/' + fn }, args)
    }
  },
  async created () {
    this.$watch('url', async () => {
      if (this.apiRoot) {
        const pks = await SchemaManager.getPrimaryKeys(this.apiRoot)
        this.primaryKeys = pks[this.route]
      }
    }, {
      immediate: true
    })
    this.$watch('query', this.get.call, {
      deep: true,
      immediate: true
    })
    this.$watch('route', this.get.call, {
      deep: true,
      immediate: true
    })
    this.$watch('apiRoot', this.get.call, {
      deep: true,
      immediate: true
    })
    this.$watch('create', (newData) => {
      this.newItem = new GenericModel(newData)
    })
  },
  render (h) {
    return this.$scopedSlots.default(this.scope)
  }
}
