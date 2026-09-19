interface EmptyStateProps {
    message?: string;
}

export function EmptyState({ message }: EmptyStateProps) {
    return <div className="empty-state">{message ?? "Nothing was found"}</div>;
}