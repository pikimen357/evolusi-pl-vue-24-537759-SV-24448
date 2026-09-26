import { describe, it, expect } from 'vitest'
import { statusBadgeClass } from '../src/utils/status'

describe('statusBadgeClass', () => {
  it('memberi kelas online untuk status online', () => {
    expect(statusBadgeClass('online')).toBe('badge badge--online')
  })

  it('memberi kelas offline untuk status offline', () => {
    expect(statusBadgeClass('offline')).toBe('badge badge--offline')
  })

  it('memberi kelas maintenance untuk status maintenance', () => {
    expect(statusBadgeClass('maintenance')).toBe('badge badge--maintenance')
  })

  it('memberi kelas default untuk status tidak dikenal', () => {
    expect(statusBadgeClass('unknown')).toBe('badge')
  })
})
