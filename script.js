document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('main-title');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const icons = document.querySelectorAll('#section2 .icon');
    const gaugeFill = document.getElementById('gauge-fill');
    const gaugePercent = document.getElementById('gauge-percent');
    const skillNameElement = document.getElementById('skill-name');
    const bubble = document.getElementById('bubble');

    // 세 번째 섹션 요소
    const flyingPhoto = document.querySelector('#section3 .flying-photo');
    const fillIcon = document.getElementById('fill-icon');
    const leftText = document.querySelector('#section3 .sec3_left-text');
    let isFilled = false;

    // 네 번째 섹션 요소
    const section4 = document.getElementById('section4');
    const flyingPhoto4 = section4.querySelector('.flying-photo4');
    const introText = document.getElementById('intro-text');

    // 다섯 번째 섹션 요소
    const githubIcon = document.getElementById('github-icon');
    const blogIcon = document.getElementById('blog-icon');
    const githubCards = document.getElementById('github-cards');
    const blogIcons = document.getElementById('blog-icons');

    // 사이드 인디케이터 관련 변수
    const sideIndicators = document.querySelectorAll('#side-indicator .indicator');

    // 아이콘과 해당 숙련도 매핑
    const skillLevels = {
        'HTML': 90,
        'CSS': 80,
        'JS': 70,
        'PHP': 60,
        'Design': 90,
        'Passion': 100
    };

    // 아이콘과 해당 색상 매핑
    const skillColors = {
        'HTML': '#FF7B00',
        'CSS': '#0000F5',
        'JS': '#FFDD00',
        'PHP': '#8C1AF6',
        'Design': '#EA33F7',
        'Passion': '#EA3323'
    };

    // 첫 번째 영역 텍스트 애니메이션
    const titleText = title.textContent;
    title.innerHTML = titleText.split('').map(char => {
        if (char === ' ') {
            return `<span style="display:inline-block; width: 0.3em;">&nbsp;</span>`;
        } else {
            return `<span>${char}</span>`;
        }
    }).join('');

    gsap.set('#main-title span', { opacity: 0 });
    gsap.fromTo('#main-title span',
        {
            x: () => `${Math.random() * 1200 - 800}px`,
            y: () => `${Math.random() * 1200 - 800}px`,
            opacity: 0
        },
        {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.5,
            stagger: 0.1,
            ease: 'power2.out',
            onComplete: () => {
                setTimeout(() => {
                    gsap.to(scrollIndicator, { opacity: 1, duration: 1 });
                }, 1000);
            }
        }
    );

    // 스크롤에 따른 섹션 전환
    let isScrolling = false;
    let animationPlayed = false; // 두 번째 섹션 애니메이션 상태 추적
    let section3Played = false;  // 세 번째 섹션 애니메이션 상태 추적
    let section4Played = false;  // 네 번째 섹션 애니메이션 상태 추적
    let section5Played = false;  // 다섯 번째 섹션 애니메이션 상태 추적

    document.addEventListener('wheel', (event) => {
        if (isScrolling) return;
        isScrolling = true;

        const currentScroll = window.scrollX;
        const sectionWidth = window.innerWidth;

        if (event.deltaY > 0) {
            // 아래로 스크롤 시 (다음 섹션으로)
            const targetScroll = currentScroll + sectionWidth;

            gsap.to(window, {
                scrollTo: { x: targetScroll }, duration: 1, ease: 'power2.inOut', onComplete: () => {
                    isScrolling = false;

                    // 두 번째 섹션 애니메이션
                    if (targetScroll === sectionWidth && !animationPlayed) {
                        icons.forEach((icon, index) => {
                            gsap.fromTo(icon,
                                {
                                    x: () => `${Math.random() * 1200 - 400}px`,
                                    y: () => `${Math.random() * 1200 - 400}px`,
                                    opacity: 0
                                },
                                {
                                    x: 0,
                                    y: 0,
                                    opacity: 1,
                                    duration: 1,
                                    ease: 'power2.out',
                                    delay: index * 0.1
                                }
                            );
                        });

                        // SVG 산 애니메이션
                        gsap.to('#background-svg', { opacity: 1, duration: 1 });
                        
                        // 산들이 서로 다른 속도로 나타나도록 설정
                        const mountains = document.querySelectorAll('#background-svg .mountain');
                        mountains.forEach((mountain, index) => {
                            gsap.fromTo(mountain,
                                {
                                    opacity: 0,
                                    y: 50 // 초기 위치를 살짝 아래로 설정
                                },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 2,
                                    ease: 'power2.out',
                                    delay: index * 1 // 각 산마다 다르게 설정
                                }
                            );
                        });

                        // 말풍선 애니메이션
                        gsap.to(bubble, { opacity: 1, y: -10, duration: 1, ease: 'power2.out', delay: 1 });

                        animationPlayed = true; // 두 번째 섹션 애니메이션 실행 상태 업데이트
                    }

                    // 세 번째 섹션 애니메이션
                    if (targetScroll === 2 * sectionWidth && !section3Played) {
                        triggerSection3Animations();
                        section3Played = true;  // 세 번째 섹션 애니메이션 실행 상태 업데이트
                    }

                    // 네 번째 섹션 애니메이션
                    if (targetScroll === 3 * sectionWidth && !section4Played) {
                        triggerSection4Animations();
                        section4Played = true;  // 네 번째 섹션 애니메이션 실행 상태 업데이트
                    }

                    // 다섯 번째 섹션 애니메이션
                    if (targetScroll === 4 * sectionWidth && !section5Played) {
                        triggerSection5Animations();
                        section5Played = true;  // 다섯 번째 섹션 애니메이션 실행 상태 업데이트
                    }
                }
            });
        } else {
            // 위로 스크롤 시 (이전 섹션으로)
            const targetScroll = currentScroll - sectionWidth;
            gsap.to(window, {
                scrollTo: { x: targetScroll }, duration: 1, ease: 'power2.inOut', onComplete: () => {
                    isScrolling = false;
                }
            });
        }
    });

    // 세 번째 섹션 애니메이션
    function triggerSection3Animations() {
        gsap.fromTo(flyingPhoto, 
            { x: 700, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }
        );

        gsap.set(fillIcon, { cursor: 'pointer' });
        fillIcon.addEventListener('click', () => {
            isFilled = !isFilled;
            if (isFilled) {
                fillIcon.src = 'icons/fill_click.png';
                gsap.to(leftText, { color: '#fff', duration: 1 });
            } else {
                fillIcon.src = 'icons/fill.png';
                gsap.to(leftText, { color: '#4a4a4a', duration: 1 });
            }
        });
    }

    // 네 번째 섹션 애니메이션
    function triggerSection4Animations() {
        gsap.fromTo(flyingPhoto4,
            { x: -800, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }
        );

        // 자기소개 텍스트 애니메이션
        const introduction = [
            '사례 분석을 통한 새로운 아이디어를 창출하는 Junior Front-end 개발자 김현수 입니다.',
            '개발자와 사용자 양측의 입장에서 생각하고 웹사이트 개발을 하고 있습니다.',
            '사용자에게 일관적인 경험을 제공해야 한다는 사용자 입장에서의 생각과, ',
            '수익성과 효율성을 생각하는 개발자 입장에서의 생각을 합니다.',
            '새로운 아이디어로 사용자에게 색다른 경험을 제공하고,',
            '더 많은 개발 경험으로 발전하는 개발자가 되겠습니다.'
        ];

        introText.innerHTML = ''; // 초기화
        introduction.forEach((line, index) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.classList.add('text-line');
                p.style.opacity = 1; // 초기화 시 opacity를 1로 설정
                introText.appendChild(p);
                typeText(line, p);
            }, index * 1600); // 각 줄마다 지연시간 추가
        });
    }

    function typeText(text, element) {
        let i = 0;
        element.style.opacity = 1; // 타이핑 시작 시 opacity를 1로 설정
        const interval = setInterval(() => {
            element.innerHTML += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(interval);
            }
        }, 50);
    }

    // 다섯 번째 섹션 애니메이션
    function triggerSection5Animations() {
        gsap.fromTo(githubIcon,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
        );

        gsap.fromTo(blogIcon,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
        );

        githubIcon.addEventListener('click', () => {
            githubCards.classList.remove('hidden');
            blogIcons.classList.add('hidden');

            // 카드 애니메이션
            const cards = document.querySelectorAll('#github-cards .card');
            cards.forEach((card, index) => {
                gsap.fromTo(card,
                    { scale: 0, opacity: 0, x: () => (index % 2 === 0 ? -500 : 500), y: () => (index % 2 === 0 ? -500 : 500) },
                    { scale: 1, opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'power2.out', delay: index * 0.3 }
                );
            });
        });

        blogIcon.addEventListener('click', () => {
            blogIcons.classList.remove('hidden');
            githubCards.classList.add('hidden');
        });
    }

    // 사이드 인디케이터 클릭 이벤트 처리
    sideIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const sectionId = indicator.getAttribute('data-section');
            const sectionIndex = Array.from(document.querySelectorAll('.section')).findIndex(section => section.id === sectionId);
            
            gsap.to(window, { scrollTo: { x: sectionIndex * window.innerWidth }, duration: 1, ease: 'power2.inOut' });

            // 인디케이터 상태 업데이트
            sideIndicators.forEach(ind => ind.classList.remove('active'));
            indicator.classList.add('active');
        });
    });

    // 현재 섹션을 표시하는 함수
    function updateActiveIndicator() {
        const scrollX = window.scrollX;
        const sectionWidth = window.innerWidth;
        const currentSectionIndex = Math.round(scrollX / sectionWidth);
        
        sideIndicators.forEach((indicator, index) => {
            if (index === currentSectionIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // 세 번째 섹션 애니메이션 트리거
        if (currentSectionIndex === 2 && !section3Played) {
            triggerSection3Animations();
            section3Played = true;
        }

        // 네 번째 섹션 애니메이션 트리거
        if (currentSectionIndex === 3 && !section4Played) {
            triggerSection4Animations();
            section4Played = true;
        }

        // 다섯 번째 섹션 애니메이션 트리거
        if (currentSectionIndex === 4 && !section5Played) {
            triggerSection5Animations();
            section5Played = true;
        }
    }

    // 스크롤 이벤트와 창 크기 조정 시 인디케이터 업데이트
    window.addEventListener('scroll', updateActiveIndicator);
    window.addEventListener('resize', updateActiveIndicator);

    // 초기 인디케이터 상태 업데이트
    updateActiveIndicator();

    // 아이콘 클릭 이벤트 처리
    let previousIcon = null;

    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            // 이전에 클릭된 아이콘이 있으면 원래대로 돌리기
            if (previousIcon && previousIcon !== icon) {
                previousIcon.src = `icons/${previousIcon.alt.toLowerCase()}.png`;
            }

            // 클릭된 아이콘 변경
            if (icon.src.includes('_click.png')) {
                icon.src = `icons/${icon.alt.toLowerCase()}.png`;
                previousIcon = null; // 클릭된 아이콘이 원래 상태로 돌아가면 이전 아이콘 정보 초기화
                updateGauge(0, '#ddd'); // 게이지를 0%로 리셋, 기본 색상으로
                skillNameElement.textContent = ''; // 기술명 초기화
            } else {
                icon.src = `icons/${icon.alt.toLowerCase()}_click.png`;
                previousIcon = icon;
                const skillName = icon.alt;
                updateGauge(skillLevels[skillName], skillColors[skillName]); // 게이지 업데이트
                skillNameElement.textContent = skillName; // 기술명 업데이트
                skillNameElement.style.color = skillColors[skillName]; // 색상 업데이트
            }
        });
    });

    // 게이지 업데이트 함수
    function updateGauge(percentage, color) {
        gaugeFill.style.width = `${percentage}%`;
        gaugeFill.style.backgroundColor = color; // 색상 업데이트
        gaugePercent.textContent = `${percentage}%`;
    }
});
