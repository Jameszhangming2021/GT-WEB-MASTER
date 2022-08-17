import defaultSettings from '@/settings'

const title = defaultSettings.title || '卓梅尼数字化管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
