import React, { useState, useCallback } from 'react';
import Tag from '../Tag/Tags';
import useLocalStorage from '../../hooks/useLocalStorage';

// Define a type for the tags stored in localStorage
type StoredTags = string[];

// AutocompleteTags Component
const AutocompleteTags: React.FC = () => {
    // Load tags from localStorage on initial render
    const [tags, setTags] = useLocalStorage<StoredTags>("tags", []);
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);


    // Callback to handle input change
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValue = event.target.value;
        setInputValue(newInputValue);

        // Filter suggestions based on the input value
        if (newInputValue.trim() !== '') {
            const filteredSuggestions = tags.filter((tag) =>
                tag.includes(newInputValue.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [tags]);

    // Callback to handle key down event on the input
    const handleInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
            const trimmedInputValue = inputValue.trim().toLowerCase();

            // Check if the tag already exists before adding
            if (!tags.includes(trimmedInputValue)) {
                setTags([...tags, trimmedInputValue]);
            }
            setInputValue('');
            // Clear suggestions after adding a new tag
            setSuggestions([]);
        }
    }, [tags, inputValue]);

    // Callback to handle tag deletion
    const handleTagDelete = useCallback((value: string) => {
        // Remove the selected tag
        setTags(tags.filter((tag) => tag !== value));
    }, [tags]);

    // Callback to handle suggestion selection
    const handleSuggestionSelect = useCallback((value: string) => {
        const trimmedInputValue = value.trim().toLowerCase();

        // Check if the tag already exists before adding
        if (!tags.includes(trimmedInputValue)) {
            setTags([...tags, trimmedInputValue]);
        }

        // Set the input value to the selected suggestion
        setInputValue(value);

        // Clear suggestions after selecting a suggestion
        setSuggestions([]);
    }, [tags]);

    // Render the AutocompleteTags component
    return (
        <div>
            <div className='tag-container'>
                {tags.map((tag) => (
                    // Render individual tags with delete functionality
                    <Tag key={tag} label={tag} onDelete={() => handleTagDelete(tag)} />
                ))}
            </div>
            {/* Input for adding tags or searching */}
            <input
                data-testid="tag-input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder='Add tags or search...'
            />
            {/* Suggestions list based on user input */}
            <ul className='suggestions'>
                {suggestions.map((suggestion, index) => (
                    // Render suggestions with click event to select
                    <li key={index} onClick={() => handleSuggestionSelect(suggestion)} data-testid="suggestion">
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AutocompleteTags;
