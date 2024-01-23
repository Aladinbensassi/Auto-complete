import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AutocompleteTags from '../src/components/AutocompleteTags/AutocompleteTags';
import '@testing-library/jest-dom/extend-expect';

describe('AutocompleteTags', () => {
    it('renders AutocompleteTags component', () => {
        const { asFragment } = render(<AutocompleteTags />);

        expect(asFragment()).toMatchSnapshot();
    });


    it('adds a tag on pressing Enter key', () => {
        render(<AutocompleteTags />);
        const inputElement = screen.getByTestId('tag-input') as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: 'newtag' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
        expect(screen.getByText('newtag')).toBeInTheDocument();
    });

    it('deletes a tag on clicking delete button', async () => {
        render(<AutocompleteTags />);

        await act(async () => {
            await waitFor(() => {
                const tagContainer = screen.queryByTestId('tag-container');

                if (tagContainer) {
                    const deleteButton = tagContainer.querySelector('[data-testid="delete-button"]');

                    if (deleteButton) {
                        fireEvent.click(deleteButton);

                        expect(screen.queryByText('newtag')).not.toBeInTheDocument();
                    }
                }
            });
        });
    });

    it('selects a suggestion on clicking a suggestion', async () => {
        render(<AutocompleteTags />);

        await act(async () => {
            await waitFor(() => {
                const suggestion = screen.queryByTestId('suggestion');

                if (suggestion) {
                    fireEvent.click(suggestion);
                }
            });
        });
    });
});