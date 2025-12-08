import type { Affix } from './createAffix'

export const DESECRATED_ID = 'ABYSSAL_ID'

const initAffix: Affix = {
  name: '亵渎词条占位符',
  level: 82,
  isPrefix: true,
  id: DESECRATED_ID,
  dropChance: 0,
  str: '此词条已被亵渎需点击解密',
  tags: [DESECRATED_ID],
  tier: -1,
  desecrated: true,
}

export const createDesecratedAffix = (affix: Partial<Affix>): Affix => {
  return { ...initAffix, ...affix }
}
