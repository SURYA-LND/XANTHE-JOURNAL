import React from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { Trade } from './TradingJournal';

interface TradeCardProps {
  trade: Trade;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

const TradeCard: React.FC<TradeCardProps> = ({ trade, onSelect, onDelete }) => {
    const isWin = trade.result === 'Win';
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-surface p-4 rounded-xl flex items-center justify-between hover:shadow-glow hover:border-primary/30 border border-transparent transition-all duration-300"
        >
            <div className="flex items-center gap-4 flex-grow">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${isWin ? 'bg-success/20' : 'bg-danger/20'}`}>
                    {isWin ? <TrendingUp className="w-6 h-6 text-success" /> : <TrendingDown className="w-6 h-6 text-danger" />}
                </div>
                <div className="flex-grow">
                    <p className="font-bold text-lg text-accent">{trade.symbol}</p>
                    <p className="text-sm text-text-secondary">{trade.strategy}</p>
                </div>
            </div>
            <div className="text-right mx-4 flex-shrink-0 hidden sm:block">
                <p className={`font-bold text-xl ${isWin ? 'text-success' : 'text-danger'}`}>
                    {isWin ? '+' : ''}${trade.pnl.toFixed(2)}
                </p>
                <p className="text-sm text-text-secondary">{trade.date}</p>
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0">
                <motion.button 
                    onClick={() => onSelect(trade.id)} 
                    className="p-2 text-text-secondary hover:text-primary transition-colors rounded-full bg-background"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Eye className="w-5 h-5" />
                </motion.button>
                <motion.button 
                    onClick={(e) => { e.stopPropagation(); onDelete(trade.id); }}
                    className="p-2 text-text-secondary hover:text-danger transition-colors rounded-full bg-background"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Trash2 className="w-5 h-5" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default TradeCard;
