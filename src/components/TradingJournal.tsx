import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Clock, 
  Target,
  BarChart3,
  Filter,
  Download,
  Plus,
  Edit2,
  Eye,
  Upload,
  Database,
  PieChart,
  X,
  Save,
  AlertCircle
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';

interface Trade {
  id: number;
  symbol: string;
  session: string;
  entryPrice: number;
  exitPrice: number;
  riskPercent: number;
  positionSize: number;
  result: 'Win' | 'Loss';
  pnl: number;
  date: string;
  time: string;
  strategy: string;
  notes: string;
  image?: string;
}

const TradingJournal: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState<'database' | 'analytics'>('database');
  const [selectedTrade, setSelectedTrade] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const initialTrades: Trade[] = [
    {
      id: 1,
      symbol: "EUR/USD",
      session: "London",
      entryPrice: 1.0845,
      exitPrice: 1.0889,
      riskPercent: 2.5,
      positionSize: 0.5,
      result: "Win",
      pnl: 220.00,
      date: "2025-01-14",
      time: "08:30",
      strategy: "Breakout",
      notes: "Perfect breakout setup with strong volume confirmation",
      image: "https://img-wrapper.vercel.app/image?url=https://placehold.co/400x200/1a1a1a/8b5cf6?text=Chart+Analysis"
    },
    {
      id: 2,
      symbol: "GBP/JPY",
      session: "London",
      entryPrice: 194.25,
      exitPrice: 193.80,
      riskPercent: 1.8,
      positionSize: 0.3,
      result: "Loss",
      pnl: -135.00,
      date: "2025-01-14",
      time: "10:15",
      strategy: "Reversal",
      notes: "Failed reversal - market continued trending down",
      image: "https://img-wrapper.vercel.app/image?url=https://placehold.co/400x200/1a1a1a/ef4444?text=Failed+Setup"
    }
  ];

  const [trades, setTrades] = useState<Trade[]>(initialTrades);
  const [newTrade, setNewTrade] = useState<Partial<Trade>>({
    symbol: '',
    session: 'London',
    entryPrice: 0,
    exitPrice: 0,
    riskPercent: 1,
    positionSize: 0.1,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    strategy: 'Breakout',
    notes: ''
  });

  const MAX_FREE_TRADES = 10;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTrade = () => {
    if (trades.length >= MAX_FREE_TRADES) {
      alert(`Free version limited to ${MAX_FREE_TRADES} trades. Upgrade for unlimited access!`);
      return;
    }

    if (!newTrade.symbol || !newTrade.entryPrice || !newTrade.exitPrice) {
      alert('Please fill in all required fields');
      return;
    }

    const pnl = ((newTrade.exitPrice! - newTrade.entryPrice!) * newTrade.positionSize! * 100000) * (newTrade.symbol?.includes('JPY') ? 0.01 : 1);
    const result: 'Win' | 'Loss' = pnl > 0 ? 'Win' : 'Loss';

    const trade: Trade = {
      id: Math.max(...trades.map(t => t.id), 0) + 1,
      symbol: newTrade.symbol!,
      session: newTrade.session!,
      entryPrice: newTrade.entryPrice!,
      exitPrice: newTrade.exitPrice!,
      riskPercent: newTrade.riskPercent!,
      positionSize: newTrade.positionSize!,
      result,
      pnl: Math.round(pnl * 100) / 100,
      date: newTrade.date!,
      time: newTrade.time!,
      strategy: newTrade.strategy!,
      notes: newTrade.notes!,
      image: imagePreview || undefined
    };

    setTrades([...trades, trade]);
    setNewTrade({
      symbol: '',
      session: 'London',
      entryPrice: 0,
      exitPrice: 0,
      riskPercent: 1,
      positionSize: 0.1,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      strategy: 'Breakout',
      notes: ''
    });
    setImageFile(null);
    setImagePreview('');
    setShowAddForm(false);
  };

  const stats = {
    totalTrades: trades.length,
    winRate: trades.length > 0 ? Math.round((trades.filter(t => t.result === "Win").length / trades.length) * 100) : 0,
    totalPnL: trades.reduce((sum, trade) => sum + trade.pnl, 0),
    avgWin: trades.filter(t => t.result === "Win").reduce((sum, trade, _, arr) => arr.length > 0 ? sum + (trade.pnl / arr.length) : 0, 0),
    avgLoss: Math.abs(trades.filter(t => t.result === "Loss").reduce((sum, trade, _, arr) => arr.length > 0 ? sum + (trade.pnl / arr.length) : 0, 0)),
  };

  // Chart Options
  const pnlChartOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'P&L Over Time',
      textStyle: { color: '#ffffff', fontSize: 16 }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      borderColor: '#a855f7',
      textStyle: { color: '#ffffff' }
    },
    xAxis: {
      type: 'category',
      data: trades.map(t => t.date),
      axisLine: { lineStyle: { color: '#a855f7' } },
      axisLabel: { color: '#9ca3af' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#a855f7' } },
      axisLabel: { color: '#9ca3af' },
      splitLine: { lineStyle: { color: '#374151' } }
    },
    series: [{
      data: trades.map(t => t.pnl),
      type: 'line',
      smooth: true,
      lineStyle: { color: '#a855f7', width: 3 },
      itemStyle: { color: '#a855f7' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(168, 85, 247, 0.3)' },
            { offset: 1, color: 'rgba(168, 85, 247, 0.05)' }
          ]
        }
      }
    }]
  };

  const winLossChartOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Win/Loss Distribution',
      textStyle: { color: '#ffffff', fontSize: 16 }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      borderColor: '#a855f7',
      textStyle: { color: '#ffffff' }
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '60%'],
      data: [
        { 
          value: trades.filter(t => t.result === 'Win').length, 
          name: 'Wins',
          itemStyle: { color: '#22c55e' }
        },
        { 
          value: trades.filter(t => t.result === 'Loss').length, 
          name: 'Losses',
          itemStyle: { color: '#ef4444' }
        }
      ],
      label: {
        color: '#ffffff',
        fontSize: 14
      }
    }]
  };

  const strategyChartOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Strategy Performance',
      textStyle: { color: '#ffffff', fontSize: 16 }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      borderColor: '#a855f7',
      textStyle: { color: '#ffffff' }
    },
    xAxis: {
      type: 'category',
      data: [...new Set(trades.map(t => t.strategy))],
      axisLine: { lineStyle: { color: '#a855f7' } },
      axisLabel: { color: '#9ca3af' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#a855f7' } },
      axisLabel: { color: '#9ca3af' },
      splitLine: { lineStyle: { color: '#374151' } }
    },
    series: [{
      data: [...new Set(trades.map(t => t.strategy))].map(strategy => 
        trades.filter(t => t.strategy === strategy).reduce((sum, t) => sum + t.pnl, 0)
      ),
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#a855f7' },
            { offset: 1, color: '#c084fc' }
          ]
        }
      }
    }]
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Interactive Trading Journal
            <span className="block gradient-text">Add Your Own Trades!</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Try our professional trading journal with your own data. Add up to {MAX_FREE_TRADES} trades for free!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">✓ Fully Interactive</span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full">✓ Add Your Trades</span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">✓ Real Analytics</span>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">✓ Chart Upload</span>
          </div>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
        >
          <div className="glass-effect p-6 rounded-xl text-center hover:shadow-neon transition-all duration-300">
            <BarChart3 className="w-6 h-6 text-neon-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.totalTrades}/10</div>
            <div className="text-sm text-gray-400">Total Trades</div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center hover:shadow-neon transition-all duration-300">
            <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{stats.winRate}%</div>
            <div className="text-sm text-gray-400">Win Rate</div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center hover:shadow-neon transition-all duration-300">
            <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">${stats.totalPnL.toFixed(0)}</div>
            <div className="text-sm text-gray-400">Total P&L</div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center hover:shadow-neon transition-all duration-300">
            <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">${stats.avgWin.toFixed(0)}</div>
            <div className="text-sm text-gray-400">Avg Win</div>
          </div>
          
          <div className="glass-effect p-6 rounded-xl text-center hover:shadow-neon transition-all duration-300">
            <TrendingDown className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-400">${stats.avgLoss.toFixed(0)}</div>
            <div className="text-sm text-gray-400">Avg Loss</div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="glass-effect rounded-lg p-2 flex">
            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'database'
                  ? 'bg-neon-purple text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Database className="w-5 h-5 mr-2" />
              Trade Database
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'analytics'
                  ? 'bg-neon-purple text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <PieChart className="w-5 h-5 mr-2" />
              Analytics
            </button>
          </div>
        </motion.div>

        {/* Database Tab */}
        {activeTab === 'database' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-effect rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-4 md:mb-0">Your Trade Entries</h3>
              <div className="flex gap-3">
                <button className="flex items-center px-4 py-2 bg-neon-purple/20 text-neon-purple rounded-lg hover:bg-neon-purple/30 transition-all duration-300">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
                <button className="flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all duration-300">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={() => setShowAddForm(true)}
                  disabled={trades.length >= MAX_FREE_TRADES}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                    trades.length >= MAX_FREE_TRADES
                      ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-neon-purple to-neon-purple-light text-black hover:shadow-neon'
                  }`}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Trade {trades.length >= MAX_FREE_TRADES && `(${trades.length}/${MAX_FREE_TRADES})`}
                </button>
              </div>
            </div>

            {trades.length >= MAX_FREE_TRADES && (
              <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-3" />
                <span className="text-yellow-400">
                  Free trial limit reached ({MAX_FREE_TRADES} trades). Upgrade for unlimited access!
                </span>
              </div>
            )}

            {/* Trades Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neon-purple/20">
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Symbol</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Session</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Entry</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Exit</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Risk %</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Result</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">P&L</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade, index) => (
                    <motion.tr
                      key={trade.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border-b border-gray-800 hover:bg-neon-purple/5 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedTrade(selectedTrade === trade.id ? null : trade.id)}
                    >
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{trade.symbol}</div>
                        <div className="text-sm text-gray-400">{trade.strategy}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                          {trade.session}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{trade.entryPrice}</td>
                      <td className="py-4 px-4 text-gray-300">{trade.exitPrice}</td>
                      <td className="py-4 px-4 text-gray-300">{trade.riskPercent}%</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded text-sm font-semibold ${
                          trade.result === 'Win' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {trade.result}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-semibold ${
                          trade.pnl > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          ${trade.pnl > 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-300">{trade.date}</div>
                        <div className="text-sm text-gray-400">{trade.time}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-400 hover:text-neon-purple transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-effect p-6 rounded-xl">
                <ReactECharts option={pnlChartOption} style={{ height: '300px' }} />
              </div>
              <div className="glass-effect p-6 rounded-xl">
                <ReactECharts option={winLossChartOption} style={{ height: '300px' }} />
              </div>
            </div>
            <div className="glass-effect p-6 rounded-xl">
              <ReactECharts option={strategyChartOption} style={{ height: '300px' }} />
            </div>
          </motion.div>
        )}

        {/* Add Trade Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-effect p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Add New Trade</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
                  <input
                    type="text"
                    value={newTrade.symbol}
                    onChange={(e) => setNewTrade({...newTrade, symbol: e.target.value})}
                    placeholder="EUR/USD"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Session</label>
                  <select
                    value={newTrade.session}
                    onChange={(e) => setNewTrade({...newTrade, session: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  >
                    <option value="London">London</option>
                    <option value="New York">New York</option>
                    <option value="Tokyo">Tokyo</option>
                    <option value="Sydney">Sydney</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Entry Price</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={newTrade.entryPrice}
                    onChange={(e) => setNewTrade({...newTrade, entryPrice: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Exit Price</label>
                  <input
                    type="number"
                    step="0.00001"
                    value={newTrade.exitPrice}
                    onChange={(e) => setNewTrade({...newTrade, exitPrice: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Risk %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newTrade.riskPercent}
                    onChange={(e) => setNewTrade({...newTrade, riskPercent: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Position Size (lots)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newTrade.positionSize}
                    onChange={(e) => setNewTrade({...newTrade, positionSize: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={newTrade.date}
                    onChange={(e) => setNewTrade({...newTrade, date: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                  <input
                    type="time"
                    value={newTrade.time}
                    onChange={(e) => setNewTrade({...newTrade, time: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Strategy</label>
                  <select
                    value={newTrade.strategy}
                    onChange={(e) => setNewTrade({...newTrade, strategy: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  >
                    <option value="Breakout">Breakout</option>
                    <option value="Reversal">Reversal</option>
                    <option value="Trend Following">Trend Following</option>
                    <option value="Support/Resistance">Support/Resistance</option>
                    <option value="News Trading">News Trading</option>
                    <option value="Scalping">Scalping</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Chart Image</label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-neon-purple transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="chart-upload"
                    />
                    <label htmlFor="chart-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">Click to upload chart image</p>
                    </label>
                    {imagePreview && (
                      <div className="mt-4">
                        <img src={imagePreview} alt="Chart preview" className="max-h-32 mx-auto rounded-lg" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                  <textarea
                    value={newTrade.notes}
                    onChange={(e) => setNewTrade({...newTrade, notes: e.target.value})}
                    placeholder="Trade analysis and notes..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleAddTrade}
                  className="flex-1 bg-gradient-to-r from-neon-purple to-neon-purple-light text-black py-3 rounded-lg font-semibold hover:shadow-neon transition-all duration-300 flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Trade
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Trade Detail Panel */}
        {selectedTrade && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-effect rounded-xl p-6 mb-8"
          >
            {(() => {
              const trade = trades.find(t => t.id === selectedTrade);
              if (!trade) return null;
              
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Trade Details - {trade.symbol}</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-400">Entry Price</label>
                          <div className="text-white font-semibold">{trade.entryPrice}</div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Exit Price</label>
                          <div className="text-white font-semibold">{trade.exitPrice}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-400">Position Size</label>
                          <div className="text-white font-semibold">{trade.positionSize} lots</div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Risk Percentage</label>
                          <div className="text-white font-semibold">{trade.riskPercent}%</div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400">Trading Notes</label>
                        <div className="text-gray-300 mt-1 p-3 bg-gray-800/50 rounded-lg">
                          {trade.notes}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Chart Analysis</h4>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      {trade.image ? (
                        <img 
                          src={trade.image} 
                          alt="Chart Analysis" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400">No chart uploaded</span>
                        </div>
                      )}
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-gray-400">Strategy: {trade.strategy}</span>
                        <span className={`font-semibold ${
                          trade.pnl > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {trade.result}: ${trade.pnl > 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="glass-effect p-12 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">
              Ready for Unlimited Trading Analysis?
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              You've experienced our powerful trading journal. Upgrade to track unlimited trades with advanced analytics, AI insights, and professional reporting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-neon-purple to-neon-purple-light text-black px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-neon-strong transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Upgrade to Pro - $79 Lifetime
              </motion.button>
              <motion.button
                className="border border-green-500 bg-green-500/10 text-green-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-500/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Free Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingJournal;
