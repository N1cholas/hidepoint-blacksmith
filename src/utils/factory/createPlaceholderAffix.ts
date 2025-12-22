import { HIDE_TIER, type Affix } from './createAffix'

export const ABYSSAL_PLACEHOLDER_ID = 'ABYSSAL_ID'

const initAffix: Affix = {
  name: '亵渎词条占位符',
  level: 82,
  isPrefix: true,
  id: ABYSSAL_PLACEHOLDER_ID,
  dropChance: 0,
  str: '此词条已被亵渎需点击解密',
  tags: [ABYSSAL_PLACEHOLDER_ID],
  tier: HIDE_TIER,
  desecrated: true,
}

export const creatPlaceholderAffix = (affix: Partial<Affix>): Affix => {
  return { ...initAffix, ...affix }
}
