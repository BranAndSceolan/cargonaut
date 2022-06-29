import { shallowMount } from '@vue/test-utils'
import CarEntry from '@/components/CarEntry.vue'
import { expect } from 'chai'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faPen, faTrash)

describe('CarEntry.vue', () => {
  it('renders CarEntry when passed', () => {
    const name = 'Herbert'
    const seats = '1'
    const room = '3'
    const wrapper = shallowMount(CarEntry, {
      propsData: { name, room, seats },
      stubs: { FontAwesomeIcon }
    })
    expect(wrapper.text()).to.include(name)
    expect(wrapper.text()).to.include(room)
    expect(wrapper.text()).to.include(seats)
  })
})
