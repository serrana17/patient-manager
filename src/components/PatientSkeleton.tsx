import React from 'react';

const PatientSkeleton: React.FC = () => {
  return (
    <div className="card animate-pulse">
      <div className="flex items-start space-x-4">
        {/* Avatar skeleton */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
        
        <div className="flex-1 min-w-0">
          {/* Name skeleton */}
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
          
          {/* Actions skeleton */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSkeleton;
