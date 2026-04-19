document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('[data-header]');
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-nav]');
    const revealItems = document.querySelectorAll('[data-reveal]');
    const faqItems = document.querySelectorAll('[data-faq]');
    const form = document.querySelector('[data-form]');
    const formNote = document.querySelector('[data-form-note]');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('is-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (header) {
        const syncHeaderState = () => {
            header.classList.toggle('is-condensed', window.scrollY > 16);
        };

        syncHeaderState();
        window.addEventListener('scroll', syncHeaderState, { passive: true });
    }

    if (revealItems.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.16
            }
        );

        revealItems.forEach((item) => revealObserver.observe(item));
    }

    faqItems.forEach((item) => {
        const button = item.querySelector('.faq-question');

        if (!button) {
            return;
        }

        button.addEventListener('click', () => {
            const isOpen = item.classList.toggle('is-open');
            button.setAttribute('aria-expanded', String(isOpen));
        });
    });

    if (form && formNote) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const name = String(formData.get('name') || '').trim();

            formNote.textContent = name
                ? `Спасибо, ${name}. В статической версии заявка не отправляется на сервер, но интерфейс готов для подключения формы.`
                : 'Спасибо. В статической версии заявка не отправляется на сервер, но интерфейс готов для подключения формы.';

            form.reset();
        });
    }
});
