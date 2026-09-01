import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <ol className="flex items-center space-x-2 text-xs text-[#7D6A60] overflow-x-auto whitespace-nowrap no-scrollbar">
        <li className="flex items-center">
          <Link
            to="/"
            className="hover:text-[#2D211D] transition-colors flex items-center gap-1 font-medium"
          >
            <Home className="w-3.5 h-3.5 text-[#A86A4A]" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-[#C9A36A] shrink-0" />
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className="hover:text-[#2D211D] font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#2D211D] font-bold truncate max-w-[200px] sm:max-w-xs">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
