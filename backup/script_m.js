document.addEventListener("DOMContentLoaded", function() {
    const titleLines = document.querySelectorAll('.title-line');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const indicators = document.querySelectorAll('.indicator');
    const video = document.getElementById('intro-video');

    // Split the text into spans for each line
    titleLines.forEach(line => {
        const text = line.textContent;
        line.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
    });

    const spans = document.querySelectorAll('#title span');

    // Randomly generate starting positions
    const getRandomPosition = () => {
        const directions = [
            { x: -200, y: -200 },
            { x: 200, y: -200 },
            { x: -200, y: 200 },
            { x: 200, y: 200 },
        ];
        return directions[Math.floor(Math.random() * directions.length)];
    };

    // Play video and wait for it to finish before starting the animation
    video.play();
    video.addEventListener('ended', () => {
        gsap.fromTo(
            spans,
            { opacity: 0, x: () => getRandomPosition().x, y: () => getRandomPosition().y },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1.5,
                ease: "power4.out",
                stagger: {
                    amount: 0.5,
                    from: "start",
                },
                onComplete: function() {
                    gsap.to(scrollIndicator, { opacity: 1, duration: 1, delay: 0.5 });
                }
            }
        );
    });

    const updateIndicator = (index) => {
        indicators.forEach(indicator => indicator.classList.remove('active'));
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
    };

    new fullpage('#fullpage', {
        navigation: true,
        navigationPosition: 'left',
        afterLoad: function(origin, destination, direction) {
            updateIndicator(destination.index);
        },
        onLeave: function(origin, destination, direction) {
            updateIndicator(destination.index);
        },
        scrollingSpeed: 700, // 스크롤 속도 조정
        autoScrolling: true, // 자동 스크롤 활성화
        fitToSection: true, // 섹션에 맞게 스크롤 조정
        scrollOverflow: false // 스크롤 오버플로우 비활성화
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            fullpage_api.moveTo(index + 1);
        });
    });

    // 두 번째 섹션에 대한 코드 추가
    const cards = document.querySelectorAll('#cards-container .card');
    const cardContent = document.getElementById('card-content');
    const contentText = document.getElementById('content-text');
    const closeBtn = document.getElementById('close-btn');

    cards.forEach((card, index) => {
        // 카드에 대한 이미지 URL 설정
        card.style.backgroundImage = `url('card/card${index + 1}.png')`;

        // 카드에 데이터 설정
        card.setAttribute('data-content', `Content for Card ${index + 1}`);

        card.addEventListener('click', () => {
            const content = card.getAttribute('data-content');

            cardContent.classList.add('active');
            contentText.textContent = content;

            gsap.to(cards, { opacity: 0, duration: 0.5 });
            gsap.fromTo(cardContent, { scale: 0 }, { scale: 1, duration: 0.5, ease: "power4.out" });
        });
    });

    closeBtn.addEventListener('click', () => {
        gsap.to(cardContent, { scale: 0, duration: 0.5, ease: "power4.in", onComplete: () => {
            cardContent.classList.remove('active');
            gsap.to(cards, { opacity: 1, duration: 0.5 });
        }});
    });
});
