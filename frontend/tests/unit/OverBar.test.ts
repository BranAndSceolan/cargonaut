import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import OverBar from '@/components/OverBar.vue'
import { expect } from 'chai'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faAngleDown } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faAngleDown)

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
describe('OverBar.vue', () => {
  it('renders OverBar when passed', () => {
    const title = 'Herbert'
    const address = '/create'
    const wrapper = shallowMount(OverBar, {
      localVue,
      router,
      propsData: { title, address },
      stubs: { FontAwesomeIcon }
    })
    expect(wrapper.text()).to.include(title)
  })
})
