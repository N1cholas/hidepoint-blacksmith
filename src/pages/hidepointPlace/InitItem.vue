<script setup lang="ts">
import { ref, computed } from 'vue'

type Rarity = 'normal' | 'magic' | 'rare'
type AffixRow = {
  id: string
  type: 'prefix' | 'suffix'
  label: string
  tiers: number[]
  tier: number
  locked?: boolean
  desecrated?: boolean
}

/* 基础信息 */
const base = ref('弓')
const rarity = ref<Rarity>('normal')
const level = ref(80)

/* 词缀目录示例 */
const catalog = ref<AffixRow[]>([
  { id: 'phys', type: 'prefix', label: '增加 25–35% 物理伤害', tiers: [1, 2, 3, 4], tier: 2 },
  { id: 'acc', type: 'prefix', label: '命中值 +300–350', tiers: [1, 2, 3, 4, 5], tier: 3 },
  { id: 'aspd', type: 'suffix', label: '攻击速度 +10–12%', tiers: [1, 2, 3], tier: 2 },
  { id: 'crit', type: 'suffix', label: '暴击率 +1.2–1.8%', tiers: [1, 2, 3], tier: 3 },
  { id: 'elem', type: 'suffix', label: '元素伤害 +20–30%', tiers: [1, 2, 3, 4], tier: 2 },
  { id: 'str', type: 'suffix', label: '力量 +20–35', tiers: [1, 2, 3, 4, 5], tier: 4 },
  { id: 'dex', type: 'suffix', label: '敏捷 +20–35', tiers: [1, 2, 3, 4, 5], tier: 4 },
])

/* 搜索+已选置顶排序 */
const q = ref('')
const selected = ref<
  Record<string, { id: string; type: 'prefix' | 'suffix'; label: string; tier: number }>
>({})
const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  const list = s
    ? catalog.value.filter((r) => r.label.toLowerCase().includes(s) || r.id.includes(s))
    : [...catalog.value]
  return list.sort((a, b) => Number(!!selected.value[b.id]) - Number(!!selected.value[a.id]))
})

/* 已选列表 */
const selectedList = computed(() => Object.values(selected.value))

function setTier(row: AffixRow, t: number) {
  row.tier = t
  if (selected.value[row.id]) {
    selected.value[row.id] = { ...selected.value[row.id], tier: t }
  }
}
function toggleSelect(row: AffixRow) {
  if (selected.value[row.id]) {
    const { [row.id]: _, ...rest } = selected.value
    selected.value = rest
  } else {
    selected.value = {
      ...selected.value,
      [row.id]: { id: row.id, type: row.type, label: row.label, tier: row.tier },
    }
  }
}
function removeSelected(id: string) {
  const { [id]: _, ...rest } = selected.value
  selected.value = rest
}
function toggleLock(row: AffixRow) {
  row.locked = !row.locked
}
function toggleDesecrate(row: AffixRow) {
  row.desecrated = !row.desecrated
}
</script>

<template>
  <section class="init-item">
    <!-- 左 -->
    <div class="side left">
      <t-card header="基础信息与已选词缀">
        <div class="line">
          <t-form-item label="装备类型" label-width="72">
            <t-select
              v-model="base"
              size="small"
              :options="[
                { label: '弓', value: '弓' },
                { label: '法杖', value: '法杖' },
                { label: '匕首', value: '匕首' },
                { label: '双手剑', value: '双手剑' },
              ]"
              placeholder="选择"
            />
          </t-form-item>
          <t-form-item label="稀有度" label-width="60">
            <t-select
              v-model="rarity"
              size="small"
              :options="[
                { label: '普通', value: 'normal' },
                { label: '魔法', value: 'magic' },
                { label: '稀有', value: 'rare' },
              ]"
              placeholder="选择"
            />
          </t-form-item>
          <t-form-item label="等级" label-width="48">
            <t-input-number v-model="level" size="small" :min="1" :max="100" />
          </t-form-item>
        </div>

        <div class="slider">
          <t-slider v-model="level" :min="1" :max="100" :show-tooltip="true" />
        </div>

        <div class="selected-wrap">
          <div class="selected-title">已选择（{{ selectedList.length }}）</div>
          <template v-if="selectedList.length">
            <t-list size="small" split class="sel-list">
              <t-list-item v-for="it in selectedList" :key="it.id">
                <div class="sel-item">
                  <t-tag
                    :theme="it.type === 'prefix' ? 'primary' : 'success'"
                    variant="light"
                    size="small"
                  >
                    {{ it.type === 'prefix' ? '前缀' : '后缀' }}
                  </t-tag>
                  <span class="name">{{ it.label }}</span>
                  <t-tag variant="outline" size="small">T{{ it.tier }}</t-tag>
                  <t-button
                    size="small"
                    variant="outline"
                    theme="danger"
                    @click="removeSelected(it.id)"
                    >删除</t-button
                  >
                </div>
              </t-list-item>
            </t-list>
          </template>
          <t-empty v-else description="尚未选择词缀" />
        </div>
      </t-card>
    </div>

    <!-- 右 -->
    <div class="side right">
      <t-card header="词缀搜索与目录">
        <t-input
          v-model="q"
          clearable
          prefix-icon="search"
          placeholder="搜索词缀（名称 / ID）…"
          class="search"
        />
        <div class="affix-table-wrap">
          <t-table
            :data="filtered"
            row-key="id"
            size="small"
            hover
            :bordered="true"
            table-layout="auto"
            :columns="[
              { colKey: 'type', title: '类型', cell: 'type', width: 86 },
              { colKey: 'label', title: '词缀', cell: 'label' },
              { colKey: 'tier', title: '阶级', cell: 'tier', width: 110 },
              { colKey: 'op', title: '操作', cell: 'op', width: 260, align: 'center' },
            ]"
          >
            <template #type="{ row }">
              <t-tag
                :theme="row.type === 'prefix' ? 'primary' : 'success'"
                variant="light"
                size="small"
              >
                {{ row.type === 'prefix' ? '前缀' : '后缀' }}
              </t-tag>
            </template>

            <template #label="{ row }">
              <t-tooltip :content="row.label" placement="top">
                <div class="affix-line">
                  <span
                    :class="{
                      locked: row.locked,
                      desecrated: row.desecrated,
                    }"
                    >{{ row.label }}</span
                  >
                </div>
              </t-tooltip>
            </template>

            <template #tier="{ row }">
              <t-select
                size="small"
                :value="row.tier"
                :options="row.tiers.map((t) => ({ label: `T${t}`, value: t }))"
                @change="(v: number) => setTier(row, v)"
                style="min-width: 100px"
              />
            </template>

            <template #op="{ row }">
              <t-space :break-line="true">
                <t-button
                  size="small"
                  :theme="selected[row.id] ? 'default' : 'primary'"
                  :variant="selected[row.id] ? 'outline' : 'base'"
                  @click="toggleSelect(row)"
                >
                  {{ selected[row.id] ? '移除' : '添加' }}
                </t-button>
                <t-button
                  size="small"
                  :variant="row.locked ? 'base' : 'outline'"
                  @click="toggleLock(row)"
                  >{{ row.locked ? '解锁' : '锁定' }}</t-button
                >
                <t-button
                  size="small"
                  :variant="row.desecrated ? 'base' : 'outline'"
                  @click="toggleDesecrate(row)"
                  >{{ row.desecrated ? '还原' : '亵渎' }}</t-button
                >
              </t-space>
            </template>
          </t-table>
        </div>
      </t-card>
    </div>
  </section>
</template>

<style scoped>
.init-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.side {
  flex: 1 1 480px;
  min-width: 0;
}

/* 顶部行 */
.line {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}
.line :deep(.t-form__item) {
  flex: 1 1 180px;
  margin: 0;
}

/* 滑块 */
.slider {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 8px;
}
.slider :deep(.t-slider) {
  flex: 1 1 auto;
  min-width: 320px;
  max-width: 100%;
}

/* 搜索+表格 */
.search {
  margin-bottom: 12px;
}
.affix-table-wrap {
  max-height: 420px;
  overflow: auto;
  border: 1px solid var(--td-border-level-1-color);
  border-radius: var(--td-radius-large);
}
.affix-table-wrap :deep(.t-table) {
  border-radius: var(--td-radius-large);
  overflow: hidden;
}

/* 已选列表 */
.selected-wrap {
  margin-top: 8px;
}
.selected-title {
  margin: 8px 0;
  font: var(--td-font-title-medium);
  color: var(--td-text-color-primary);
}
.sel-list {
  max-height: 260px;
  overflow: auto;
  padding-right: 6px;
}
.sel-item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.sel-item .name {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--td-text-color-primary);
  white-space: normal;
  word-break: break-word;
}

/* 文案单行省略 + tooltip */
.affix-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* 状态色 */
.locked {
  color: var(--td-warning-color);
  font-weight: 600;
}
.desecrated {
  color: var(--td-text-color-placeholder);
  text-decoration: line-through;
}

/* 收缩非文本列，给 label 列空间 */
:deep(th[data-col='type']),
:deep(td[data-col='type']) {
  width: 86px;
}
:deep(th[data-col='tier']),
:deep(td[data-col='tier']) {
  width: 110px;
}
:deep(th[data-col='op']),
:deep(td[data-col='op']) {
  width: 260px;
}
:deep(td[data-col='label']) {
  width: auto;
  max-width: 1px;
}
</style>
