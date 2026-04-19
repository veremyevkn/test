document.addEventListener('DOMContentLoaded', () => {
    const timeEl = document.getElementById('server-time-value');
    const timestampEl = document.getElementById('server-timestamp-value');
    const statusEl = document.getElementById('status-message');

    if (!timeEl || !timestampEl || !statusEl) {
        return;
    }

    if (window.location.protocol === 'file:') {
        timeEl.textContent = 'PHP не запущен';
        timestampEl.textContent = '--';
        statusEl.textContent = 'Открой проект через локальный PHP-сервер, иначе time.php не выполнится';
        statusEl.classList.add('info-error');
        return;
    }

    async function updateServerTime() {
        try {
            const response = await fetch('time.php', {
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            timeEl.textContent = data.datetime;
            timestampEl.textContent = String(data.timestamp);
            statusEl.textContent = 'Данные успешно получены с сервера';
            statusEl.classList.remove('info-error');
        } catch (error) {
            timeEl.textContent = 'Ошибка загрузки';
            timestampEl.textContent = '--';
            statusEl.textContent = 'Не удалось получить серверное время';
            statusEl.classList.add('info-error');
            console.error('Failed to fetch server time:', error);
        }
    }

    updateServerTime();
    setInterval(updateServerTime, 1000);
});
