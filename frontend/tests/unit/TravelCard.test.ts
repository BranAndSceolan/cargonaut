import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import TravelCard from '@/components/travel-card.vue'
import { expect } from 'chai'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleDot } from '@fortawesome/free-solid-svg-icons'
library.add(faCircleDot)

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
describe('travel-card.vue', () => {
  it('renders TravelCard when passed', () => {
    const date = '2022-12-24'
    const title = 'Schnelle Fahrt'
    const seats = 3
    const height = 1.5
    const width = 2.2
    const length = 4
    const origin = 'Gießen'
    const destination = 'Wetzlar'
    const price = 10
    const wrapper = shallowMount(TravelCard, {
      localVue,
      router,
      propsData: { date, title, seats, height, width, length, origin, destination, price },
      stubs: { FontAwesomeIcon }
    })
    expect(wrapper.text()).to.include(date)
    expect(wrapper.text()).to.include(title)
    expect(wrapper.text()).to.include(seats)
    expect(wrapper.text()).to.include(height)
    expect(wrapper.text()).to.include(width)
    expect(wrapper.text()).to.include(length)
    expect(wrapper.text()).to.include(origin)
    expect(wrapper.text()).to.include(destination)
    expect(wrapper.text()).to.include(price)
  })
})
