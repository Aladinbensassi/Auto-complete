import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AutocompleteTags from '../src/components/AutocompleteTags/AutocompleteTags';

describe('AutocompleteTags', () => {
    beforeEach(() => {
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify(['tag1', 'tag2']));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders tags and input field', () => {
        render(<AutocompleteTags />);

        expect(screen.getByPlaceholderText(/Add tags or search.../i)).toBeInTheDocument();
        expect(screen.getByText(/tag1/i)).toBeInTheDocument();
        expect(screen.getByText(/tag2/i)).toBeInTheDocument();
    });

    it('adds a new tag on Enter key press', () => {
        render(<AutocompleteTags />);

        const input = screen.getByPlaceholderText(/Add tags or search.../i) as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'newTag' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(screen.getByText(/newTag/i)).toBeInTheDocument();
        expect(input.value).toBe('');
    });

    it('deletes a tag on delete button click', () => {
        render(<AutocompleteTags />);

        const deleteButton = screen.getByText(/tag1/i).closest('.tag')!.querySelector('button')!;
        fireEvent.click(deleteButton);

        expect(screen.queryByText(/tag1/i)).not.toBeInTheDocument();
    });
});
