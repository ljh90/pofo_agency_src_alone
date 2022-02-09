(($, window, document, undefined)=>{
    // alert('hi');
    class pofo {
        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.section9();
            this.section10();
            this.footer();
        }
        header(){
/*             여기서 말하는 스크롤은 윈도우의 스크롤을 말한다. 
            스크롤 탑 값이 0 이면      72px - 기본값이니까 추가된 클래스를 모두 삭제해주면 된다.
                                             Header.removeClass('addH60'); =>이게 없으면 뒤에 아무리 추가해도 안되기 때문에 지울 땐 addH60 만 지워주면 된다
                                             Header.removeClass('addShow');
                                             Header.removeClass('addHide');
                                            
            스크롤 탑 값이 0 이 아니면 60px - 클래스를 추가하여 높이를 60으로 바꿔준다.
                                             Header.addClass('addH60'); */
            let newTop =  $(window).scrollTop();
            let oldTop = newTop;
            let x = '';
            
            //* 스크롤 이벤트가 발생하면
            $(window).scroll(function(){
                if( $(window).scrollTop() == 0 ){ // scrollTop값이 0이면
                    $('#header').removeClass('addH60');
                    $('#header').removeClass('addShow');
                    $('#header').removeClass('addHide');
                }
                else{ // 변화는 헤더가 스크롤이 내려가면서 생기니까 else에서 작업
                    // scrollTop값이 0이 아니면,
                    $('#header').addClass('addH60');
                    //3. 위 아래 방향 알아내기
                    newTop = $(window).scrollTop();
                        x = oldTop-newTop > 0 ? 'UP' : 'DOWN';
                            if(x=='UP'){ // 각자 if문에 addClass는 removeClass해준다
                                $('#header').addClass('addShow')
                                $('#header').removeClass('addHide');
                            }
                            if(x=='DOWN'){
                                $('#header').removeClass('addShow')
                                $('#header').addClass('addHide');
                            }
                    oldTop = newTop;
                }
            })


            // console.log('header');
            const mainBtn = $('.main-btn');
            const sub = $('.sub');
            const idNav = $('#nav');
            const subBtn = $('.sub-btn');
            const subSub = $('.sub-sub');
            
            // 메인메뉴에서 서브메뉴가 보이도록
            mainBtn.on({
                // mouseenter: function(e){
                mouseenter(e){ //ES6 버전. mouseenter는 접근성을 신경써줘야한다
                    const $this = $(this)
                        sub.stop().fadeOut(0); // 사라지는 건 항상 위에 올려준다
                        $this.next().stop().fadeIn(400);
                },
                focusin(e){ //ES6 버전. mouseenter는 접근성을 신경써줘야한다
                    const $this = $(this)
                        sub.stop().fadeOut(0); // 사라지는 건 항상 위에 올려준다
                        $this.next().stop().fadeIn(400);
                }
            });

            idNav.on({
                mouseleave(){ // 네비게이션 영역을 마우스가 떠나면 500의 속도로 메뉴가 사라진다
                    sub.stop().fadeOut(300);
                    subSub.stop().fadeOut(300); // 이거 정리 안해줘도 작동은 하지만 아래 subBtn에 fadeIn이 남아있으니까 정리해주면 더 깔끔
                }
            });

            //서브메뉴에서 서브서브메뉴가 펼쳐지게
            subBtn.on({
                mouseenter(){
                    const $this = $(this);
                        subSub.stop().fadeOut(0);
                        $this.next().stop().fadeIn(300);
                },
                focusin(){
                    const $this = $(this);
                        subSub.stop().fadeOut(0);
                        $this.next().stop().fadeIn(300);
                }
            });

        }
        section1(){
            // console.log('section1');
            // 1. 변수설정💛
            const slideWrap = $('.slide-wrap'); // 슬라이드 적용하는 곳
            let cnt = 0;

            // 2. 메인슬라이드함수💛
            function mainSlide(){// 단위쓰는 법 확인할 것
                slideWrap.stop().animate({left: -100*cnt + '%'}, 600, 'easeInOutExpo',function(){
                    if(cnt>2){cnt=0}
                    if(cnt<0){cnt=2}
                    slideWrap.stop().animate({left: -100*cnt + '%'}, 1);
                });
            }
            // 3. 다음버튼클릭이벤트💛
            function nextCount(){
                cnt++;
                mainSlide();
            }
            // 5. 이전버튼클릭이벤트💛
            function prevCount(){
                cnt--;
                mainSlide();
            }
            // 4. 자동타이머💛
                // 5 - setInterval(prevCount, 3000);
                // 3 - setInterval(nextCount, 3000);

            // 6. 스와이프(좌우 터치 이벤트)💛
                // 6-1 오른쪽에서 왼쪽으로 터치 : 다음슬라이드
                // 6-2 왼쪽에서 오른쪽으로 터치 : 이전슬라이드
                // 터치의 시작점과 끝점의 값을 계산해서 그 값이 -인지 +인지 체크해서 좌우터치 방향을 확인한다.
                // 왼쪽                   오른쪽
                //  0----------------------1903
                // 오른쪽 -> 왼쪽 터치 +값 => 다음
                // 왼쪽 -> 오른쪽 터치 -값 => 이전
                // 좌우 값 clientX 상하값 clientY

            const slideView = $('.slide-view'); // 슬라이드 터치 적용하는 곳
            let tS = null; // touchStart 터치 시작 좌표값 저장 변수
            let tE = null; // touchEnd   터치 종료 좌표값 저장 변수
            let dS = null; // dragStart  드래그 시작 좌표값 저장 변수
            let dE = null; // draghEnd   드래그 종료 좌표값 저장 변수
            let mD = null; // mouseDown  

            
                slideView.on({
                    mousedown(e){
                        console.log('터치 시작', e.clientX); 
                        tS = e.clientX;
                        dS = e.clientX - slideWrap.offset().left-1903; 
                        //- slideWrap.offset().left-1903; 슬라이드는 기다랗기 때문에 left값이 계속 바뀌는데 전체 기럭지에서 left값을 뽑아주기 위해 추가해야한다
                        // offset이 cnt증가값에 따라 left값이 계속 변하는걸 자동으로 잡아주도록 식 쓴 것
                        // 단 반드시 left에서 -1903해야한다.
                        // 이 식이 없으면 하나만 되고 두번째 세번째 슬라이드는 제대로 작동하지 않는다.

                        // 터치에서 클릭이 시작할 때 드래그 시작점 이동한다! ↓
                        mD = true; // 마우스다운이 이뤄졌다. 이거 없으면 마우스가 화면에서 움직이기만 해도 난리 난다
                    },
                    mouseup(e){
                        console.log('터치 끝', e.clientX);
                        tE = e.clientX;
                        mD = false; // 마우스다운 끝났다
                        if( (tS-tE) > 0 ){
                            nextCount();
                        }
                        if( (tS-tE) < 0 ){
                            prevCount();
                        }
                    },
                    // 7. tS=tE 값을 드래그로 인식하게 하기. 슬라이드에서 animate썼으니까 이번엔 css로 구현하기 💛 slideWrap
                    // drag & drop 물체를 실제로 잡고 끌고 가서 내려놓는 것을 구현
                    mousemove(e){
                        // slideWrap.css({left: 좌표값(dragEnd-dragStart=시작점보다 끝점이 더 기니까 끝점-시작점) });
                        // 반드시 마우스 다운(mouseDown)이 이뤄져야 실행된다. 그냥 마우스가 왔다갔다 하는 건 무시.
                        if( !mD ){return}// 마우스 다운이 트루가 아니면 돌아나간다. classic => if(mD!==true){return}
                        dE = e.clientX;
                        slideWrap.css({ left: dE-dS }); // 이건 실제 전환하는 애니메이션 기능이 있는게 아니라 모양만 보여주는 것. 넘기는건 animate가 해주는 것
                    }
                });
        }
        section2(){
            // console.log('section2');
        }
        section3(){
            // console.log('section3');
        }
        section4(){
            // console.log('section4');
        }
        section5(){
            // console.log('section5');
        }
        section6(){
            // console.log('section6');
        }
        section7(){
            // console.log('section7');
        }
        section8(){
            // console.log('section8');
        }
        section9(){
            // console.log('section9');
        }
        section10(){
            // console.log('section10');
        }
        footer(){
            // console.log('footer');
        }
    }
    const newPofo = new pofo();
    newPofo.init();
})(jQuery, window, document);