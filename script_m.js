document.addEventListener("DOMContentLoaded", function() {
    const titleLines = document.querySelectorAll('.title-line');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const indicators = document.querySelectorAll('.indicator');
    const video = document.getElementById('intro-video');
    const videoDuration = 6000; // 6초를 밀리초로 변환

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
});
