export function statusBadgeClass(status) {
  switch (status) {
    case 'online':
      return 'badge badge--online'
    case 'offline':
      return 'badge badge--offline'
    case 'maintenance':
      return 'badge badge--maintenance'
    default:
      return 'badge'
  }
}
