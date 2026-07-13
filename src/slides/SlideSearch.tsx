import { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './SlideSearch.module.css';

interface SearchRecord {
  项目: string;
  高校: string;
  地区: string;
  学院: string;
  专业: string;
  截止时间: string;
  夏令营时间: string;
  分类: string;
  链接: string;
  英语要求: string;
}

type SortKey = '高校' | '截止时间' | '分类';

export function SlideSearch() {
  const [data, setData] = useState<SearchRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [discipline, setDiscipline] = useState('全部');
  const [sortBy, setSortBy] = useState<SortKey>('截止时间');
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;

  useEffect(() => {
    fetch('/data/search_data.json')
      .then((r) => r.json())
      .then((d: SearchRecord[]) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const disciplines = useMemo(
    () => ['全部', ...Array.from(new Set(data.map((d) => d.分类).filter(Boolean)))],
    [data],
  );

  const regionOptions = useMemo(
    () => ['全部地区', ...Array.from(new Set(data.map((d) => d.地区).filter(Boolean)))].slice(0, 20),
    [data],
  );

  const [region, setRegion] = useState('全部地区');

  const filtered = useMemo(() => {
    let result = data;
    if (discipline !== '全部') result = result.filter((d) => d.分类 === discipline);
    if (region !== '全部地区') result = result.filter((d) => d.地区 === region);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (d) =>
          d.高校.toLowerCase().includes(q) ||
          d.学院.toLowerCase().includes(q) ||
          d.专业.toLowerCase().includes(q) ||
          d.项目.toLowerCase().includes(q),
      );
    }
    // Sort
    if (sortBy === '高校') {
      result = [...result].sort((a, b) => a.高校.localeCompare(b.高校, 'zh'));
    } else if (sortBy === '截止时间') {
      result = [...result].sort((a, b) => (a.截止时间 || '9').localeCompare(b.截止时间 || '9'));
    } else {
      result = [...result].sort((a, b) => a.分类.localeCompare(b.分类, 'zh'));
    }
    return result;
  }, [data, query, discipline, region, sortBy]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const resetPage = useCallback(() => setPage(0), []);

  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      resetPage();
    },
    [resetPage],
  );

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <p className="section-kicker">09 · 查询</p>
        <h2 className={styles.heading}>
          🔍 加载数据库中<span className={styles.em}>...</span>
        </h2>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className="section-kicker">09 · 查询</p>
        <h2 className={styles.heading}>
          搜索 <span className={styles.em}>{filtered.length}</span> 个匹配项目
        </h2>
      </div>

      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="搜索高校、学院、专业..."
          value={query}
          onChange={handleQueryChange}
        />

        <select
          className={styles.select}
          value={discipline}
          onChange={(e) => { setDiscipline(e.target.value); resetPage(); }}
        >
          {disciplines.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          className={styles.select}
          value={region}
          onChange={(e) => { setRegion(e.target.value); resetPage(); }}
        >
          {regionOptions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value as SortKey); resetPage(); }}
        >
          <option value="截止时间">按截止时间</option>
          <option value="高校">按高校名称</option>
          <option value="分类">按学科分类</option>
        </select>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>高校</th>
              <th>学院</th>
              <th>专业</th>
              <th>截止时间</th>
              <th>夏令营</th>
              <th>分类</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => (
              <tr key={i}>
                <td className={styles.uniCell}>{row.高校}</td>
                <td>{row.学院}</td>
                <td className={styles.majorCell}>{row.专业}</td>
                <td className={row.截止时间 ? styles.deadline : styles.empty}>{row.截止时间 || '-'}</td>
                <td className={row.夏令营时间 ? '' : styles.empty}>{row.夏令营时间 || '-'}</td>
                <td>
                  <span className={styles.badge}>{row.分类}</span>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyRow}>
                  没有匹配的结果，试试调整筛选条件
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            ← 上一页
          </button>
          <span className={styles.pageInfo}>
            {page + 1} / {totalPages}
          </span>
          <button
            className={styles.pageBtn}
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          >
            下一页 →
          </button>
        </div>
      )}
    </div>
  );
}
