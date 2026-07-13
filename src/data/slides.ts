import type { ComponentType } from 'react';
import { SlideCover } from '../slides/SlideCover';
import { SlideContent } from '../slides/SlideContent';
import { SlideQuestion } from '../slides/SlideQuestion';
import { SlideConcept } from '../slides/SlideConcept';
import { SlideStepMap } from '../slides/SlideStepMap';
import { SlideEnd } from '../slides/SlideEnd';
import { SlideSearch } from '../slides/SlideSearch';

export interface SlideData {
  id: string;
  type: 'cover' | 'content' | 'question' | 'concept' | 'stepmap' | 'end' | 'search';
  title: string;
  notes: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
  props?: Record<string, unknown>;
}

export const slides: SlideData[] = [
  // ── Slide 0: 封面 ──
  {
    id: 'cover',
    type: 'cover',
    title: '封面',
    notes: '开场：2026夏令营申请完全指南。用数据说话，帮你制定保研策略。',
    Component: SlideCover,
    props: {
      kicker: '数据驱动 · 保研策略',
      title: '2026夏令营<br/>申请完全指南',
      subtitle: '从海量数据中看清方向',
      tags: ['5266个项目', '218所高校', '6大学科门类'],
      duration: '建议时长 15 min',
    },
  },

  // ── Slide 1: 数据总览 ──
  {
    id: 'overview',
    type: 'content',
    title: '数据总览',
    notes: '这份数据来自2026夏令营申请时间表，覆盖5,266个项目、218所高校、6大学科分类。先让大家对数据规模有个概念。',
    Component: SlideContent,
    props: {
      kicker: '01 · 总览',
      heading: '一份覆盖<em>5,266 个项目</em>的数据库',
      subheading: '整理自 2026 年夏令营申请时间表，涵盖 218 所高校、6 大学科门类。',
      metrics: [
        { value: '5,266', label: '项目总数' },
        { value: '218', label: '覆盖高校' },
        { value: '6', label: '学科门类' },
        { value: '20+', label: '热门专业方向' },
      ],
      bullets: [
        '数据来源：各高校官方夏令营通知，实时更新',
        '覆盖学科：理工&农学 / 医学 / 经管 / 文科 / 法学 / 综合',
        '关键字段：高校、学院、专业、成绩要求、英语要求、截止时间、夏令营时间',
      ],
    },
  },

  // ── Slide 2: 学科大类分布 ──
  {
    id: 'discipline-dist',
    type: 'content',
    title: '学科分布',
    notes: '理工&农学项目最多（1,564条），其次是综合类（1,777条）。文科和医学类各700条左右，经管类530条。法学类目前数据较少，需要重点关注单独通知。',
    Component: SlideContent,
    props: {
      kicker: '02 · 学科',
      heading: '<em>理工&农学</em>项目最多，<em>经管</em>竞争最激烈',
      subheading: '6大学科门类的项目数量分布与申请特点。',
      bullets: [
        '理工&农学：1,564 个项目，覆盖最广，从计算机到材料应有尽有',
        '综合类：1,777 个项目，多为跨学科或未分类项目',
        '文科：735 个项目，新闻传播、法学、外语、教育学等',
        '医学类：658 个项目，临床医学、基础医学、药学等',
        '经管类：531 个项目，金融、会计、工商管理等热门方向',
        '法学类：数据较少，多数法学院独立发布通知',
      ],
    },
  },

  // ── Slide 3: 热门院校 TOP 排行榜 ──
  {
    id: 'top-unis',
    type: 'content',
    title: '热门院校',
    notes: '中国科学院大学（490个项目）一骑绝尘，清华（243）、上海交大（184）、北大（157）、浙大（131）紧随其后。中科院系统是保研大户，项目覆盖面极广。',
    Component: SlideContent,
    props: {
      kicker: '03 · 院校',
      heading: '中国科学院<em>一骑绝尘</em>，清北交浙紧随其后',
      subheading: '项目数量 TOP 15 高校排行榜。',
      bullets: [
        '🥇 中国科学院（490 项）—— 研究所遍布全国，覆盖面极广',
        '🥈 清华大学（243 项）—— 工科见长，各学科均有布局',
        '🥉 上海交通大学（184 项）—— 医工交叉特色鲜明',
        '北京大学（157 项）、浙江大学（131 项）紧随其后',
        '山东大学（120 项）、中科大（109 项）、吉林大学（100 项）超百项',
        '注意：项目多≠好申请，还需看竞争比和匹配度',
      ],
    },
  },

  // ── Slide 4: 学科深度分析（概念切换） ──
  {
    id: 'discipline-deep',
    type: 'concept',
    title: '学科深度分析',
    notes: '各学科申请策略不同：理工重科研经历，经管重实习+英语，医学重临床/实验室经历，文科重论文发表。',
    Component: SlideConcept,
    props: {
      kicker: '04 · 深度',
      heading: '不同学科，<em>申请策略大不同</em>',
      word: '学科策略',
      concepts: [
        {
          key: 'sci',
          label: '理工&农学',
          icon: '🔬',
          title: '科研经历是核心竞争力',
          desc: '1,564个项目，中科院系统优势明显。申请重点：论文/专利 > GPA排名 > 竞赛获奖 > 英语。建议提前联系导师，关注研究所独立招生。',
        },
        {
          key: 'econ',
          label: '经管类',
          icon: '📊',
          title: '实习+英语双轮驱动',
          desc: '531个项目，头部集中度高（清北复交人）。申请重点：实习经历 > 英语（六级550+/雅思6.5+）> 数理背景 > GPA。金融、会计方向竞争尤为激烈。',
        },
        {
          key: 'med',
          label: '医学类',
          icon: '🏥',
          title: '临床/实验室经历决定成败',
          desc: '658个项目，多数要求医学相关本科。申请重点：临床/实验室经历 > 导师推荐 > GPA > 英语。注意区分学术型与专业型硕士路径。',
        },
        {
          key: 'arts',
          label: '文科类',
          icon: '📚',
          title: '论文写作能力是关键',
          desc: '735个项目，覆盖新闻传播、法学、教育、外语、哲学等。申请重点：论文发表 > 语言表达 > 社会实践 > GPA。个人陈述质量至关重要。',
        },
      ],
    },
  },

  // ── Slide 5: 英语要求分析 ──
  {
    id: 'english-req',
    type: 'content',
    title: '英语门槛',
    notes: '78%的项目未标注英语要求（默认可通过），约15%要求六级，5%要求四级。雅思/托福/GMAT主要是经管类项目。总体英语门槛不算高，但经管类建议六级550+。',
    Component: SlideContent,
    props: {
      kicker: '05 · 英语',
      heading: '约<em>15%</em> 明确要求六级，经管类门槛最高',
      subheading: '英语要求分布与备考建议。',
      bullets: [
        '未明确标注：78%（约4,081项）—— 默认通过即可，但隐性门槛存在',
        '六级要求：15%（约784项）—— 经管类主流要求550+，其他学科425+',
        '四级要求：5%（约267项）—— 最低门槛，多见于地方院校',
        '雅思/托福/GMAT：<1%（约11项）—— 主要是中外合作/港澳项目',
        '备考建议：六级500+是安全线，经管类建议550+或雅思6.5+',
      ],
    },
  },

  // ── Slide 6: 截止时间分析 ──
  {
    id: 'deadline',
    type: 'content',
    title: '时间线',
    notes: '大部分夏令营截止时间集中在每年1月，少量在3-6月。数据中的大比例"已过期"是因为很多项目1月份就已截止。但每年时间线基本一致，可作为2027届参考。',
    Component: SlideContent,
    props: {
      kicker: '06 · 时间',
      heading: '高峰期在<em>1月</em>，<em>3-6月</em>是第二波',
      subheading: '基于 2026 年截止时间的分布规律。',
      bullets: [
        '📅 1月：约4,460个项目截止（全年最密集）',
        '📅 3月：约12个项目截止（春季小高峰）',
        '📅 4月：约26个项目截止',
        '📅 5月：约156个项目截止（暑期前集中）',
        '📅 6月：约489个项目截止（最后窗口）',
        '📅 7-8月：约35个项目截止（末期补录）',
        '⚠️ 建议：大二暑假开始准备材料，大三上学期海投',
      ],
    },
  },

  // ── Slide 7: 申请路线图（步骤地图） ──
  {
    id: 'roadmap',
    type: 'stepmap',
    title: '申请路线图',
    notes: '六步申请路线：定位目标→准备材料→筛选项目→投递申请→参营考核→确认录取。关键时间节点：大三暑假定位，9-12月准备，1-3月投递，4-6月参营，7-8月确认。',
    Component: SlideStepMap,
    props: {
      kicker: '07 · 路线',
      heading: '一张图看懂<em>夏令营申请全流程</em>',
      hint: '点击方块，看看每一步的关键动作。',
      steps: [
        { letter: '定', label: '定位', subtitle: '大三暑期', detail: '根据GPA排名、科研/实习经历、英语水平，确定目标院校层次（冲/稳/保）', question: '我的竞争力适合申请什么层次的学校？' },
        { letter: '备', label: '准备', subtitle: '9-12月', detail: '撰写个人陈述、简历；联系推荐人；扫描成绩单和证书；刷六级/雅思成绩', question: '我的材料是否足够支撑申请目标？' },
        { letter: '筛', label: '筛选', subtitle: '12-1月', detail: '利用本数据库按学科/地区/院校筛选项目，标记截止日期，建立申请台账', question: '如何高效找到匹配的项目？' },
        { letter: '投', label: '投递', subtitle: '1-3月', detail: '按时提交网申，确认推荐信到位，跟踪申请状态。高峰期1月，注意不要错过截止', question: '投递策略：海投还是精准？' },
        { letter: '考', label: '参营', subtitle: '4-6月', detail: '笔试/面试/答辩。部分院校线上参营，注意时间冲突。提前了解考核形式和往年真题', question: '如何准备夏令营考核？' },
        { letter: '录', label: '确认', subtitle: '7-8月', detail: '收到offer后确认录取，关注国家推免系统开放时间（9月），完成最终确认', question: '拿到offer后还要做什么？' },
      ],
      phases: [
        { name: '准备期', steps: ['定位', '准备'] },
        { name: '执行期', steps: ['筛选', '投递', '参营', '确认'] },
      ],
    },
  },

  // ── Slide 8: 互动查询 ──
  {
    id: 'search',
    type: 'search',
    title: '院校查询',
    notes: '这个搜索页面可以按学科、地区、院校名称、专业方向等筛选5,266条夏令营项目数据。建议大家多用这个工具辅助选校定位。',
    Component: SlideSearch,
  },

  // ── Slide 9: 申请策略问答 ──
  {
    id: 'strategy-qa',
    type: 'question',
    title: '策略问答',
    notes: '通过互动问答强化关键申请策略：提前准备、分层定位、利用数据。',
    Component: SlideQuestion,
    props: {
      kicker: '08 · 策略',
      heading: '根据数据，<em>最佳的申请策略</em>是什么？',
      choices: [
        { letter: 'A', title: '只投顶尖名校', desc: '集中精力冲刺清北复交' },
        { letter: 'B', title: '分层投递', desc: '冲/稳/保三档各选3-5所' },
        { letter: 'C', title: '海投策略', desc: '能投的全部投一遍' },
      ],
      correctAnswer: 1,
      feedback: {
        correct: '✓ 正确！数据支持：218所高校中，冲/稳/保分层是效率最高的策略。',
        wrong: '建议再看一下院校分布数据——只有分层投递才能最大化录取概率。',
      },
    },
  },

  // ── Slide 10: 总结 ──
  {
    id: 'end',
    type: 'end',
    title: '总结',
    notes: '结束语：5,266个项目只是起点，找到适合自己的方向才是关键。记住四个字：早、广、准、稳。',
    Component: SlideEnd,
    props: {
      kicker: 'TAKEAWAY',
      heading: '5,266 个项目只是起点<br>找到<em>适合自己的方向</em>才是关键',
      summary: [
        { char: '早', label: '提前准备' },
        { char: '广', label: '广泛筛选' },
        { char: '准', label: '精准定位' },
        { char: '稳', label: '分层投递' },
      ],
      slogan: '早准备 · 广筛选 · 准定位 · 稳申请',
      sources: '数据来源：2026夏令营申请时间表 · 218所高校 · 5,266个项目',
    },
  },
];
