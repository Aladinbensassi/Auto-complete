import React from 'react';

interface TagProps {
    label: string;
    onDelete: () => void;
}

const Tag: React.FC<TagProps> = ({ label, onDelete }) => {
    return (
        <div className="tag">
            <span>{label}</span>
            <button onClick={onDelete}>&times;</button>
        </div>
    );
};

export default Tag;