import { shallowMount } from '@vue/test-utils'
import ReviewEntry from '@/components/ReviewEntry.vue'
import { expect } from 'chai'

describe('ReviewEntry.vue', () => {
  it('renders ReviewEntry when passed', () => {
    const name = 'Herbert'
    const date = '2022-12-24'
    const wrapper = shallowMount(ReviewEntry, {
      propsData: { name, date }
    })
    expect(wrapper.text()).to.include(name)
    expect(wrapper.text()).to.include(date)
  })
})
