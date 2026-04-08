import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import StatCard from './StatCard.svelte';

describe('StatCard Component', () => {
  it('renders correctly with props', () => {
    const props = {
      label: 'Total Revenue',
      value: '₦1,000,000',
      change: '+10%',
      trend: 'up' as const,
      emoji: '💰'
    };

    render(StatCard, { props });

    expect(screen.getByText('Total Revenue')).toBeDefined();
    expect(screen.getByText('₦1,000,000')).toBeDefined();
    expect(screen.getByText(/\+10%/)).toBeDefined();
    expect(screen.getAllByText('💰').length).toBeGreaterThan(0);
  });
});
