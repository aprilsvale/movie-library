interface EmptyStateProps {
    message?: string;
}

export function EmptyState({ message }: EmptyStateProps) {
    return <div className="empty-state">{message ?? "Ничего не найдено"}</div>;
}