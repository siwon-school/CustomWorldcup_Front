import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { getAPI, patchAPI } from "../axios";
import { useParams } from "react-router-dom";

const WorldCupUpdate = () => {
  const { id } = useParams();
  // console.log("id ::: ", id);

  const [worldcupModifed, setWorldCupModifed] = useState([]);

  // TODO 1. useEffect로 월드컴 상세 조회하는 GET API 호출 -> id를 이용해서 조회.
  useEffect(() => {
    getAPI(`/api/worldcup/${id}`).then((data) => {
      if (data.status === 200) {
        console.log("data.data.results :: ", data.data.worldcup);
        setWorldCupModifed(data.data.worldcup);
      }
    });
  }, [id]);

  // TODO 2. const 변수에 담아
  const worldcup = {
    worldcup_id: worldcupModifed.worldcup_id,
  };

  // console.log('worldcup :: ', worldcup)

  // TODO 3. 아래에 그 데이터를 뿌려줘 -> input value={worldcup.title}
  // worldcup에서 파일 꺼내와서 아래 files 로 원래 보여줬던 부분에 넣기

  // 여기에 필요한 함수나 변수를 선언하는 공간
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // validation 함수
  const validation = () => {
    // TODO 회원가입할때 하는 빈값 체크 validation 추가
  };

  // 월드컵 제목
  const handleChange_title = (e) => {
    setTitle(e.target.value);
    setWorldCupModifed({
      ...worldcupModifed,
      title: e.target.value,
    });
  };

  // 월드컵 설명
  const handleChange_content = (e) => {
    setContent(e.target.value);
    setWorldCupModifed({
      ...worldcupModifed,
      content: e.target.value,
    });
  };

  // 수정 버튼
  const worldCupModifedHandler = (e) => {
    e.preventDefault();

    const worldCup = {
      title: worldcupModifed.title,
      content: worldcupModifed.content,
    };

    // TODO 1. axios 파일에 patch 만들기
    // TODO 2. api 호출해서 연동

    // /api/worldcup/119
    patchAPI(`/api/worldcup/${worldcup.worldcup_id}`, worldCup)
      .then(() => {
        alert("게시물이 수정이 완료되었습니다.");
        document.location.href = "/mypage";
      })
      .catch((e) => console.log("e :: ", e));
  };

  return (
    <Container>
      <ContentDiv>
        <PageNameDiv>
          <PageNameHTag>이상형 월드컵 기본정보</PageNameHTag>
        </PageNameDiv>
        <form>
          <InputDiv>
            <InputBox>
              <InputLabel>제목</InputLabel>
              <InputText>
                <Input
                  type="text"
                  onChange={handleChange_title}
                  value={worldcupModifed.title || ""}
                />
                <InputSpan>
                  이상형 월드컵의 제목을 입력하세요. 예) 고양이 월드컵, 강아지
                  월드컵
                </InputSpan>
              </InputText>
            </InputBox>
            <GapDiv></GapDiv>
            <InputBox>
              <InputLabel>내용</InputLabel>
              <InputText>
                <Input
                  type="text"
                  onChange={handleChange_content}
                  value={worldcupModifed.content || ""}
                />
                <InputSpan>설명, 하고싶은 말 등을 자유롭게 쓰세요.</InputSpan>
              </InputText>
            </InputBox>
          </InputDiv>
          <ImgContent>
            <ImgBox>
              <ImgDiv>
                <PageNameDiv>
                  <PageNameHTag>이미지는 수정이 불가능합니다.</PageNameHTag>
                </PageNameDiv>
                <ImgInputDiv>
                  {/* <InputImgBox>
                    <InputLabel>이미지 제목</InputLabel>
                    <InputText>
                      <Input
                        type="text"
                        value={choice_name}
                        onChange={handleChange_choicename}
                      />
                      <InputSpan>이미지 제목을 입력하세요.</InputSpan>
                    </InputText>
                  </InputImgBox>
                  <InputImgBox>
                    <InputLabel>이미지 url</InputLabel>
                    <InputText>
                      <Input
                        type="text"
                        value={choice_url}
                        onChange={handleChange_choiceurl}
                      />
                      <InputSpan>이미지 url을 입력하세요.</InputSpan>
                    </InputText>
                  </InputImgBox> */}
                  {/* <InputImgBox>
                          <InputLabels>이미지</InputLabels>
                          <ImgTextBox>
                            <ImgStore></ImgStore> */}
                  {/* <InputSpan> */}
                  {/* 이미지 저장공간 (4장만 저장할 수 있습니다) */}
                  {/* </InputSpan> */}
                  {/* <Button clickAddButtonHandler={clickAddButtonHandler}>
                        추가
                      </Button> */}
                  {/* </ImgTextBox>
                        </InputImgBox> */}
                </ImgInputDiv>
              </ImgDiv>
            </ImgBox>
          </ImgContent>
          <StoreBtn onClick={worldCupModifedHandler}>수정하기</StoreBtn>
        </form>
      </ContentDiv>
    </Container>
  );
};

export default WorldCupUpdate;

const Container = styled.div`
  width: 100%;
  margin: auto;
`;

const ContentDiv = styled.div`
  background: #f3f3f4;
  height: 800px;
  padding: 15px;
`;

const PageNameDiv = styled.div`
  background-color: #fff;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0 0;
  color: inherit;
  margin-bottom: 0;
  padding: 15px 15px;
  min-height: 48px;
  box-sizing: border-box;
`;

const PageNameHTag = styled.h2`
  display: inline-block;
  font-size: 14px;
  margin: 0 0 7px;
  padding: 0;
  text-overflow: ellipsis;
  float: left;
  font-weight: 600;
`;

const InputDiv = styled.div`
  background-color: #fff;
  color: inherit;
  padding: 15px 20px 20px;
  width: 100%;
  box-sizing: border-box;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
`;

const InputBox = styled.div`
  margin-right: -15px;
  margin-left: -15px;
  width: 100%;
  display: flex;
`;

const InputLabel = styled.label`
  padding-top: 9px;
  margin-bottom: 0;
  text-align: center;
  width: 10%;
`;

const InputLabels = styled.label`
  margin-top: 15px;
  margin-bottom: 0;
  text-align: center;
  width: 10%;
`;

const InputText = styled.label`
  width: 90%;
`;

const ImgTextBox = styled.div`
  width: 90%;
`;

const Input = styled.input`
  background-color: #fff;
  background-image: none;
  border: 1px solid #e5e6e7;
  border-radius: 1px;
  color: inherit;
  display: block;
  padding: 10px 12px;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  width: 100%;
  font-size: 14px;
`;

const InputSpan = styled.span`
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #737373;
  margin-bottom: 0;
`;

const GapDiv = styled.div`
  border-top: 1px dashed #e7eaec;
  color: #fff;
  background-color: #fff;
  height: 1px;
  margin: 20px 0;
`;

const ImgContent = styled.div`
  margin-right: -15px;
  margin-left: -15px;
`;

const ImgBox = styled.div`
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
`;

const InputImgBox = styled.div`
  margin-right: -15px;
  margin-left: -15px;
  width: 100%;
  display: flex;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const ImgDiv = styled.div`
  clear: both;
  margin-bottom: 0;
  margin-top: 0;
  padding: 0;
`;

const ImgInputDiv = styled.div`
  height: 300px;
  background-color: #fff;
  color: inherit;
  padding: 15px 20px 20px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
  clear: both;
`;

const StoreBtn = styled.button`
  margin-top: 15px;
  margin-bottom: 5px;
  margin-right: 20px;
  background-color: #769fcd;
  border-color: #769fcd;
  color: #fff;
  border-radius: 3px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  cursor: pointer;
  border: 1px solid transparent;
  float: right;
`;

const ImgStore = styled.div`
  background-color: #fff;
  background-image: none;
  border: 1px solid #e5e6e7;
  border-radius: 1px;
  color: inherit;
  display: flex;
  /* padding: 10px 12px; */
  /* transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s; */
  width: 100%;
  font-size: 14px;
  height: 45px;
`;
