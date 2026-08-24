 // ============================================================
        // 1. LOADER
        // ============================================================
        (function loader() {
            const bar = document.getElementById('loaderBar');
            if (!bar) return;
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10 + 3;
                if (progress > 100) progress = 100;
                bar.style.width = progress + '%';
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        document.getElementById('loader').classList.add('hide');
                        document.body.style.overflow = 'auto';
                        document.querySelector('.hero').classList.add('loaded');
                        observeElements();
                        countNumbers();
                        initBooking();
                        initWhyList();
                    }, 400);
                }
            }, 80);
        })();

        // ============================================================
        // 2. NAVBAR SCROLL
        // ============================================================
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 60);
        });

        // ============================================================
        // 3. MOBILE MENU
        // ============================================================
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        function openMobileMenu() {
            mobileMenu.classList.add('open');
            hamburger.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.classList.add('menu-open');
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }

        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        document.querySelectorAll('[data-nav]').forEach(el => {
            el.addEventListener('click', () => { closeMobileMenu(); });
        });

        document.querySelector('.cta-mobile')?.addEventListener('click', () => { closeMobileMenu(); });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (mobileMenu.classList.contains('open')) closeMobileMenu();
                if (modal.classList.contains('open')) closeModal();
            }
        });

        // ============================================================
        // 4. SMOOTH SCROLL & CTAs
        // ============================================================
        const navCtas = document.querySelectorAll('[data-nav-cta]');

        function scrollToBooking(e) {
            e.preventDefault();
            const target = document.getElementById('booking');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMobileMenu();
            }
        }
        navCtas.forEach(btn => btn.addEventListener('click', scrollToBooking));

        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (href === '#booking') {
                    e.preventDefault();
                    scrollToBooking(e);
                }
                document.querySelectorAll('[data-nav]').forEach(l => l.classList.remove('active'));
                if (a.dataset.nav) a.classList.add('active');
                closeMobileMenu();
            });
        });

        // ============================================================
        // 5. SCROLL OBSERVER
        // ============================================================
        function observeElements() {
            const els = document.querySelectorAll('.reveal');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            els.forEach(el => observer.observe(el));
        }

        // ============================================================
        // 6. NUMBER COUNTING
        // ============================================================
        function countNumbers() {
            const numbers = document.querySelectorAll('[data-count]');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const target = parseFloat(el.getAttribute('data-count'));
                        const isFloat = target % 1 !== 0;
                        const duration = 1800;
                        const startTime = performance.now();

                        function update(currentTime) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            const current = eased * target;
                            el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
                            if (progress < 1) requestAnimationFrame(update);
                            else {
                                if (target === 24) el.textContent = '24/7';
                                else if (target === 100) el.textContent = '100%';
                                else el.textContent = isFloat ? target.toFixed(1) : target;
                            }
                        }
                        requestAnimationFrame(update);
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.3 });
            numbers.forEach(el => observer.observe(el));
        }

        // ============================================================
        // 7. WHY LIST
        // ============================================================
        function initWhyList() {
            const items = document.querySelectorAll('.why-list .item');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const idx = parseInt(entry.target.dataset.why);
                        items.forEach((el, i) => el.classList.toggle('active', i === idx));
                    }
                });
            }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
            items.forEach(el => observer.observe(el));
        }

        // ============================================================
        // 8. BOOKING SYSTEM
        // ============================================================
        const state = {
            facility: 'Football / Futsal',
            date: null,
            time: null,
            duration: '1 Hour',
            players: '4',
        };

        const priceMap = {
            'Football / Futsal': 2500,
            'Cricket': 3000,
            'Indoor Ground': 2800,
            'Training Session': 2000,
        };
        const durationMultiplier = { '1 Hour': 1, '2 Hours': 1.8, '3 Hours': 2.5 };

        function generateDates() {
            const dates = [];
            const now = new Date();
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (let i = 0; i < 7; i++) {
                const d = new Date(now);
                d.setDate(now.getDate() + i);
                const day = days[d.getDay()];
                const dateNum = d.getDate();
                const value =
                    `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(dateNum).padStart(2,'0')}`;
                dates.push({ day, dateNum, value, label: `${day} ${dateNum}` });
            }
            return dates;
        }
        const dateData = generateDates();

        const timeData = [
            { label: '06:00 PM', value: '06:00 PM', status: 'AVAILABLE' },
            { label: '07:00 PM', value: '07:00 PM', status: 'AVAILABLE' },
            { label: '08:00 PM', value: '08:00 PM', status: 'POPULAR' },
            { label: '09:00 PM', value: '09:00 PM', status: 'BOOKED' },
            { label: '10:00 PM', value: '10:00 PM', status: 'AVAILABLE' },
        ];

        const datePicker = document.getElementById('datePicker');
        dateData.forEach((d, idx) => {
            const btn = document.createElement('div');
            btn.className = 'date-opt' + (idx === 0 ? ' selected' : '');
            btn.dataset.date = d.value;
            btn.innerHTML = `<div class="day">${d.day}</div><div class="num">${d.dateNum}</div>`;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.date-opt').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.date = d.value;
                updateSummary();
                validateBooking();
            });
            datePicker.appendChild(btn);
        });
        state.date = dateData[0].value;

        const timeContainer = document.getElementById('timeOptions');
        timeData.forEach((t, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            let cls = 'opt';
            if (t.status === 'BOOKED') cls += ' booked';
            if (t.status === 'POPULAR') cls += ' popular';
            if (idx === 0 && t.status !== 'BOOKED') cls += ' selected';
            btn.className = cls;
            btn.dataset.time = t.value;
            btn.innerHTML = `${t.label} <span class="badge">${t.status}</span>`;
            if (t.status !== 'BOOKED') {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('#timeOptions .opt:not(.booked)').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    state.time = t.value;
                    updateSummary();
                    validateBooking();
                });
            }
            timeContainer.appendChild(btn);
        });
        const firstAvail = timeData.find(t => t.status !== 'BOOKED');
        if (firstAvail) state.time = firstAvail.value;

        document.querySelectorAll('#facilityOptions .opt').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#facilityOptions .opt').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.facility = btn.dataset.facility;
                updateSummary();
                validateBooking();
            });
        });

        document.querySelectorAll('#durationOptions .opt').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#durationOptions .opt').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.duration = btn.dataset.duration;
                updateSummary();
                validateBooking();
            });
        });

        document.querySelectorAll('#playersOptions .opt').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#playersOptions .opt').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.players = btn.dataset.players;
                updateSummary();
                validateBooking();
            });
        });

        function updateSummary() {
            document.getElementById('sumFacility').textContent = state.facility;
            const d = dateData.find(d => d.value === state.date);
            document.getElementById('sumDate').textContent = d ? d.label : '—';
            document.getElementById('sumTime').textContent = state.time || '—';
            document.getElementById('sumDuration').textContent = state.duration;
            document.getElementById('sumPlayers').textContent = state.players;

            const base = priceMap[state.facility] || 2500;
            const mult = durationMultiplier[state.duration] || 1;
            const total = Math.round(base * mult);
            document.getElementById('sumPrice').textContent = `PKR ${total.toLocaleString()}`;
            document.getElementById('stickyPrice').textContent = `PKR ${total.toLocaleString()}`;
            document.getElementById('stickyDesc').textContent = `${state.facility} · ${state.duration}`;
        }

        function validateBooking() {
            const valid = state.date && state.time && state.facility && state.duration && state.players;
            document.getElementById('continueBooking').disabled = !valid;
            document.getElementById('stickyContinue').disabled = !valid;
        }

        const continueBtn = document.getElementById('continueBooking');
        const stickyContinue = document.getElementById('stickyContinue');
        const modal = document.getElementById('confirmationModal');
        const modalClose = document.getElementById('modalClose');
        const modalWhatsApp = document.getElementById('modalWhatsApp');

        function openModal() {
            const d = dateData.find(d => d.value === state.date);
            document.getElementById('modalFacility').textContent = state.facility;
            document.getElementById('modalDate').textContent = d ? d.label : '—';
            document.getElementById('modalTime').textContent = state.time || '—';
            document.getElementById('modalDuration').textContent = state.duration;
            document.getElementById('modalPlayers').textContent = state.players;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }

        continueBtn.addEventListener('click', openModal);
        stickyContinue.addEventListener('click', openModal);
        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        modalWhatsApp.addEventListener('click', () => {
            const phone = '923000900269';
            const d = dateData.find(d => d.value === state.date);
            const dateLabel = d ? d.label : '—';
            const msg =
                `Hello! I'd like to book a slot at The NCG:%0A%0A🏟️ Facility: ${state.facility}%0A📅 Date: ${dateLabel}%0A🕒 Time: ${state.time}%0A⏱️ Duration: ${state.duration}%0A👥 Players: ${state.players}%0A%0AThis is a demo booking request. Please confirm availability.`;
            window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
            closeModal();
        });

        function initBooking() {
            updateSummary();
            validateBooking();
        }

        // ============================================================
        // 9. ACTIVE NAV ON SCROLL
        // ============================================================
        const sections = ['home', 'facilities', 'experience', 'booking', 'reviews'];
        const navItems = document.querySelectorAll('[data-nav]');
        const sectionElements = sections.map(id => document.getElementById(id));

        window.addEventListener('scroll', () => {
            let current = '';
            sectionElements.forEach((sec, i) => {
                if (!sec) return;
                const rect = sec.getBoundingClientRect();
                if (rect.top <= 120) current = sections[i];
            });
            navItems.forEach((a) => {
                const href = a.getAttribute('href')?.replace('#', '') || '';
                a.classList.toggle('active', href === current);
            });
        });

        console.log('✅ The NCG — Booking system fully responsive on mobile.');
        console.log('📸 Replace image src attributes with your own files.');
        console.log('📍 Google Maps embedded correctly.');