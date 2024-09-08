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

    // 카드 색상 설정
    const cardColors = ['rgb(86 187 65 / 90%)', '#927988', '#1B1C5C', '#FD835C', '#640294'];

    cards.forEach((card, index) => {
        // 카드에 대한 이미지 URL 설정
        card.style.backgroundImage = `url('card/card${index + 1}.png')`;

        // 카드에 데이터 설정
        card.setAttribute('data-content', `content${index + 1}`);

        card.addEventListener('click', () => {
            const contentId = card.getAttribute('data-content');
            const contentDiv = document.getElementById(contentId);

            // 모든 카드 컨텐츠 숨기기
            document.querySelectorAll('.card-details').forEach(div => div.style.display = 'none');
            
            // 카드 컨텐츠 배경색 설정 및 표시
            cardContent.style.backgroundColor = cardColors[index];
            cardContent.classList.add('active');
            gsap.fromTo(cardContent, { scale: 0 }, { scale: 1, duration: 0.5, ease: "power4.out" });

            // 카드 컨텐츠 텍스트 애니메이션
            if (contentId === 'content1') {
                contentDiv.style.display = 'block';
                typeText(contentDiv.querySelector('#content-text'));
            } else {
                contentDiv.style.display = 'block';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        gsap.to(cardContent, { scale: 0, duration: 0.5, ease: "power4.in", onComplete: () => {
            cardContent.classList.remove('active');
            cardContent.querySelector('#content-text').innerHTML = ''; // 텍스트 초기화
            cardContent.querySelectorAll('.profile, .divider').forEach(el => el.remove()); // 이미지와 구분선 제거
        }});
    });

    // 텍스트 타이핑 애니메이션
    function typeText(element) {
        const text = `사례 분석을 통한 새로운 아이디어를 창출하는 Junior Front-end 개발자 김현수 입니다.\n
        개발자와 사용자 양측의 입장에서 생각하고 웹사이트 개발을 하고 있습니다.\n
        사용자에게 일관적인 경험을 제공해야 한다는 사용자 입장에서의 생각과,\n
        수익성과 효율성을 생각하는 개발자 입장에서의 생각을 합니다.\n
        새로운 아이디어로 사용자에게 색다른 경험을 제공하고,\n
        더 많은 개발 경험으로 발전하는 개발자가 되겠습니다.`;
        let index = 0;
        element.innerHTML = '';

        function type() {
            if (index < text.length) {
                if (text.charAt(index) === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += text.charAt(index);
                }
                index++;
                setTimeout(type, 30); // 타이핑 속도 조정
            }
        }
        
        type();
    }
});
