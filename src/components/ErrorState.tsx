interface ErrorStateProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="error-state">
            <p>Ошибка: {message}</p>
            {onRetry && <button onClick={onRetry}>Try again</button>}
        </div>
    );
}