import React from 'react';

interface ActionIconProps {
    src: string;
    alt: string;
    tooltip: string;
    onClick: () => void;
}

const ActionIcon: React.FC<ActionIconProps> = ({ src, alt, tooltip, onClick }) => {
    return (
        <div className="relative group">
            <img
                className="cursor-pointer transform transition-transform duration-200 hover:scale-125"
                onClick={onClick}
                src={src}
                width={20}
                alt={alt}
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
                {tooltip}
            </div>
        </div>
    );
};

export default ActionIcon;