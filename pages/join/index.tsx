import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import * as S from 'styles/join/style';
import spaceImg from 'public/assets/space_pressed.jpg';
// import spaceImg from "public/assets/space.jpg";
// import spaceImg2 from "public/assets/space2.jpg";
// import spaceImg3 from "public/assets/space3.jpg";
import ReactPannellum, { getConfig } from 'react-pannellum';
import { FireLottie } from 'components/lottie/lottie';
import RocketImg from 'public/assets/joinus_rocket.png';
import PlanetImg from 'public/assets/new_earth@4x.png';
import { motion } from 'framer-motion';
import S3upload from 'components/s3upload/index';
import { useRecoilState } from 'recoil';
import { joinModalOpen, isLaunched } from 'constants/atoms';
import Text from 'public/assets/Accelerate_Your_Potential.png';
import Logo from 'public/assets/new_logo(wh).svg';
import LogoLikeLion from 'public/assets/likelion_kor_logo.svg';
const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
};

export default function Join() {
    const [loading, setLoading] = useState(true);
    const [launch, setLaunch] = useRecoilState(isLaunched);
    const [modalPage, setModalPage] = useState(1);
    const [modalOpen, setModalOpen] = useRecoilState(joinModalOpen);
    const [accept, setAccept] = useState(false);
    const isDesktop = useMediaQuery({ minDeviceWidth: 1000 });
    const isMobile = useMediaQuery({ maxWidth: 1000 });
    const config = {
        autoRotate: 1,
        autoLoad: true,
        showControls: false,
        mouseZoom: false,
        uiText: {
            loadingLabel: 'NEXT를 향해 비행중...',
            bylineLabel: '',
            iOS8WebGLError: '',
            genericWebGLError: '',
            textureSizeError: '',
        },
    };

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const startApplicationTime = new Date('2025-02-02T23:50:00');
    const endApplicationTime = new Date('2025-02-15T23:59:00');

    let buttonText = '지원하기';
    let disabled = false;

    if (currentTime < startApplicationTime) {
        buttonText = '아직 모집 기간이 아닙니다';
    } else if (currentTime > endApplicationTime) {
        buttonText = '모집 기간이 종료되었습니다';
    }

    useEffect(() => {
        // console.log("loaded");
        setLoading(false);
    }, [isMobile, isDesktop]);

    useEffect(() => {
        return () => {
            setLaunch(false);
            setModalOpen(false);
        };
    }, []);

    useEffect(() => {
        return () => {
            setModalPage(1);
        };
    }, [modalOpen]);

    return (
        <div>
            <Head>
                <title>NEXT: JOIN</title>
                <meta name="description" content="고려대학교 소프트웨어창업학회 NEXT에 탑승하세요" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            {!loading && (
                <S.Container>
                    {!launch && (
                        <S.TitleWrapper isMobile={isMobile}>
                            <img src={Text.src} style={{ width: '40%' }} />
                            <img src={Logo.src} />
                            <div className="university-wrapper">
                                <span>고려대학교</span>
                                <img src={LogoLikeLion.src} />
                            </div>
                            <p>13기 모집</p>
                            <S.RocketInfo className="rocket-info" isMobile={isMobile}>
                                <p>
                                    <span className="rocket">로켓</span>을 눌러보세요!
                                </p>
                            </S.RocketInfo>
                        </S.TitleWrapper>
                    )}
                    {launch && (
                        <S.TitleWrapper isMobile={isMobile}>
                            <p>지원해주셔서 감사합니다</p>
                            <br />
                            <p style={{ fontSize: '1.8rem' }}>NEXT에서 세상을 바꿔나갈 여러분의 도전을 응원합니다!</p>
                        </S.TitleWrapper>
                    )}
                    <motion.div
                        animate={modalOpen ? 'open' : 'closed'}
                        variants={variants}
                        style={{ zIndex: '10', opacity: '0' }}
                    >
                        <S.ModalContainer infoOpen={modalOpen}>
                            <S.CloseBtnWrapper>
                                <div onClick={() => setModalOpen(false)}>X</div>
                            </S.CloseBtnWrapper>
                            <S.ModalContentWrapper>
                                {modalPage == 1 && (
                                    <S.InfoModal>
                                        <h2>13기 지원 안내</h2>
                                        <br />
                                        <p>
                                            <span>1. 지원방식</span>
                                            <br /> a. 아래 <mark>[지원서 다운로드]</mark> 버튼을 클릭한 후 지원서 양식
                                            다운로드 <br />
                                            b. 서류 접수 기간 내에 지원서 작성 <br />
                                            c. 아래 <mark>[지원하기]</mark> 버튼을 클릭하여 지원서 업로드
                                            <br /> <b>**</b>[지원하기] 버튼은 지원 기간 중에만 확인 가능합니다.
                                            <br /> d. 모든 문항별 글자수는 공백을 포함한 글자수를 기준으로 합니다.
                                            <br />
                                            e. 제출한 지원서는 수정할 수 없습니다.
                                            <br />
                                            <br />
                                            <span>2. 리크루팅 일정</span>
                                            <br />
                                            서류접수 : 2/3(월) - 2/15(토) <br />
                                            리크루팅 설명회 : 2/9(일) 오후 7시
                                            <br />
                                            1차 합격자 발표 : 2/19(수)
                                            <br />
                                            면접전형 : 2/22(토) - 2/23(일)
                                            <br />
                                            최종 합격자 발표 : 2/26(수)
                                            <br />
                                            <br />
                                            <span>3. 수료 기준</span>
                                            <br />
                                            학회에서 1년 동안 진행하는 모든 세션 및 행사는 필참입니다.
                                            <br />
                                            불성실하게 참여하는 경우 수료에 제한이 생길 수 있음을 알려드립니다.
                                            <br />
                                            <br />
                                            <span>4. 면접 촬영 및 개인정보 수집 안내</span>
                                            <br /> 면접 평가는 모두 <b>대면</b>
                                            으로 이뤄집니다.
                                            <br />
                                            원활한 스케줄 조정을 위하여 2월22일(토), 23일(일) 중 가능한 시간대를 꼭
                                            구글폼에 체크해주시면 감사하겠습니다
                                            <br />
                                            공정한 면접 평가를 위해 면접 내용을 촬영 및 수집할 예정입니다.
                                            <br />
                                            촬영한 면접영상 및 개인정보는 선발과정에서만 활용되며, 리크루팅 이후 즉시
                                            폐기될 예정입니다.
                                            <br />
                                            <br />
                                            <span>5. 학회비 안내</span> <br />
                                            원활한 학회 운영을 위해 학회비를 걷어 운영하고 있습니다.
                                            <br />
                                            새로 들어오시는 학회원들은 <b>10만원</b>의 학회비를 납부하고, 해당 금액은
                                            학회 운영을 위해서만 사용될 예정입니다.
                                            <br />
                                            학회원들은 모든 회계 정산 내용을 활동 종료 이후 학회 노션 페이지에서
                                            확인하실 수 있습니다. <br />
                                            <br />
                                            <span>6. 오리엔테이션 필참</span>
                                            <br />
                                            최종 합격 이후 <b>3월 1일(토)</b>에 진행되는 OT는 필수 참여입니다. 원활한
                                            학회 운영을 위해, OT를 고려하여 개인 일정을 조정해주시면 감사하겠습니다.{' '}
                                            <br />
                                            <br />
                                            <span>7. 문의 창구</span>
                                            <br />
                                            💬 카카오톡 채널 |{' '}
                                            <a
                                                href="https://pf.kakao.com/_xacxgxbn"
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                고려대학교 NEXT
                                            </a>{' '}
                                            <br />
                                            💬 인스타그램 DM | @next_koreauniv <br />
                                            💬 13기 대표 김정현 | 010-4665-7870 <br />
                                        </p>
                                        <S.CheckContainer>
                                            <input
                                                checked={accept}
                                                type="checkbox"
                                                id="acceptCheck"
                                                onClick={() => {
                                                    setAccept((prev) => !prev);
                                                }}
                                            />
                                            <label
                                                onClick={() => {
                                                    setAccept((prev) => !prev);
                                                }}
                                            >
                                                위 안내사항을 확인했으며, 이에 동의합니다.
                                            </label>
                                        </S.CheckContainer>

                                        <S.NextBtnWrapper isMobile={isMobile} accepted={accept}>
                                            <button
                                                onClick={() =>
                                                    (location.href =
                                                        'https://docs.google.com/document/d/18Q33ghiQllUNdZjMVF_8zU5CUH3W1vl8/export?format=docx')
                                                }
                                            >
                                                지원서 다운로드
                                            </button>
                                            <button
                                                disabled={!accept}
                                                onClick={() => {
                                                    if (
                                                        currentTime >= startApplicationTime &&
                                                        currentTime <= endApplicationTime
                                                    ) {
                                                        window.open(
                                                            'https://docs.google.com/forms/d/e/1FAIpQLSflklIDViHx8pV6O3QBd6tHYaGYhol6xGxIvjzZorH-fCy5Dw/viewform',
                                                            '_blank'
                                                        );
                                                    }
                                                }}
                                            >
                                                {buttonText}
                                            </button>
                                        </S.NextBtnWrapper>
                                    </S.InfoModal>
                                )}
                                {modalPage == 2 && <S3upload />}
                            </S.ModalContentWrapper>
                        </S.ModalContainer>
                    </motion.div>
                    <S.SpaceContainer isMobile={isMobile}>
                        <S.RocketContainer
                            onClick={() => {
                                setModalOpen((modalOpen) => !modalOpen);
                            }}
                            launched={launch}
                        >
                            <S.Rocket>
                                <img src={RocketImg.src} />
                            </S.Rocket>
                            {/* <S.Fire launched={launch}>
                                <FireLottie />
                            </S.Fire> */}
                        </S.RocketContainer>

                        <S.Planet launched={launch}>
                            <img draggable={false} src={PlanetImg.src} />
                        </S.Planet>
                    </S.SpaceContainer>

                    {/*<ReactPannellum
                        id="1"
                        sceneId="BG"
                        // haov={200}
                        imageSource={spaceImg.src}
                        config={config}
                        style={{
                            width: '100vw',
                            height: '100vh',
                            background: '#000000',
                            cursor: 'pointer',
                        }}
                    />
                      */}
                </S.Container>
            )}
        </div>
    );
}
