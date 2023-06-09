import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAPI } from "../axios";

library.add(solidHeart, regularHeart);

const API_URL = "http://13.125.1.214/api";

const Main = () => {
  const [worldCups, setWorldCups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAPI("/api/worldcup"); // 변경된 부분
        setWorldCups(response.data.worldcups);
      } catch (error) {
        console.error("Failed to fetch world cups:", error);
      }
    };
    fetchData();
  }, []);

  const sortByLikes = () => {
    setWorldCups([...worldCups].sort((a, b) => b.likes - a.likes));
  };

  const sortByDate = () => {
    setWorldCups(
      [...worldCups].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  };

  return (
    <Container>
      <SortButtons>
        <SortButton onClick={sortByLikes}>인기순</SortButton>
        <SortButton onClick={sortByDate}>최신순</SortButton>
      </SortButtons>
      <WorldCupGrid>
        {worldCups.map((worldCup) => (
          <WorldCupCard key={worldCup.worldcup_id} worldCup={worldCup} />
        ))}
      </WorldCupGrid>
    </Container>
  );
};

const WorldCupCard = ({ worldCup }) => {
  const { worldcup_id, title, content, choices, likes } = worldCup;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const toggleLike = async (worldCupId, liked) => {
    const token = sessionStorage.getItem("token");
    try {
      setLiked(!liked);
      const response = await axios.put(
        `${API_URL}/worldcup/${worldCupId}/likes`,
        {
          like: !liked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLiked(!liked);
      setLikeCount(response.data.data.likes);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleLike = async (worldCupId) => { // 변경된 부분
    await toggleLike(worldCupId, liked); // 변경된 부분
  };

  if (!choices || choices.length < 2) {
    return null;
  }

  return (
    <Card>
      <ImageContainer>
        {choices && choices.length >= 2 ? (
          <>
            <Image
              src={choices[0].choice_url}
              alt={choices[0].choice_name}
              style={{ width: "50%" }}
            />
            <Image
              src={choices[1].choice_url}
              alt={choices[1].choice_name}
              style={{ width: "50%" }}
            />
          </>
        ) : (
          <Empty />
        )}
      </ImageContainer>
      <NameContent>
        <Title>{title}</Title>
        <Description>{content}</Description>
      </NameContent>
      <ButtonContainer>
        <LeftButtons>
          <Link to={`/play/${worldCup.worldcup_id}`}>
            <PlayButton>플레이</PlayButton>
          </Link>
          <Link to={`/results/${worldCup.worldcup_id}`}>
            <ResultButton>결과 페이지</ResultButton>
          </Link>
        </LeftButtons>
        <LikeWrapper>
          <Likes>
            <FontAwesomeIcon
              icon={liked ? solidHeart : regularHeart}
              size="lg" // 아이콘 크기
              // icon과 숫자 사이의 간격을 조정
              style={{ marginRight: "0.5rem" }}
              onClick={() => handleLike(worldcup_id)}
            />
          </Likes>
        </LikeWrapper>
      </ButtonContainer>
    </Card>
  );
};

export default Main;

// Styled components
const Container = styled.div`
  height: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7fbfc;
`;

const SortButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: 20px;
  margin-top: 20px;
`;

const WorldCupGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px; // 간격을 조정 원하는 간격으로 변경
  padding: 20px;
`;

const Card = styled.div`
  width: 400px;
  height: 270px;
  background-color: white;
  margin: 20px 20px;
  text-align: right;
  border: 1px solid #d6e6f2;
  border-radius: 3px;
  &:hover {
    border: 1px solid #4690e4;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 200px; // 이미지 크기
  height: 150px; // 이미지 크기
  object-fit: cover;
`;

const Title = styled.div`
  width: 100%;
  height: 32px;
  font-size: 18px;
  text-align: left;
  box-sizing: border-box;
  padding: 5px;
  &:hover {
    color: #769fcd;
  }
`;

const Description = styled.div`
  width: 100%;
  height: 28px;
  font-size: 14px;
  text-align: left;
  padding: 5px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center; // 버튼과 좋아요 아이콘을 수직으로 가운데 정렬
  width: 100%;
  gap: 8px; // 버튼 간격 조절
`;

const SortButton = styled.button`
  background-color: #769fcd;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  border: 1px solid #769fcd;
  cursor: pointer;
  &:hover {
    background-color: #5885b8;
  }
`;

const PlayButton = styled(SortButton)`
  width: 100px;
  height: 35px;
  background-color: white;
  border: 1px solid #769fcd;
  margin-right: 10px;
  font-weight: bold;
  color: #769fcd;
  opacity: 1;
  transition: 0.5s;
  &:hover {
    cursor: pointer;
    background-color: #769fcd;
    color: white;
    font-weight: bold;
    opacity: 1;
  }
`;

const ResultButton = styled(SortButton)`
  width: 100px;
  height: 35px;
  background-color: white;
  border: 1px solid #769fcd;
  margin-right: 10px;
  font-weight: bold;
  color: #769fcd;
  opacity: 1;
  transition: 0.5s;
  &:hover {
    cursor: pointer;
    background-color: #769fcd;
    color: white;
    font-weight: bold;
    opacity: 1;
  }
`;

const Likes = styled.span`
  font-size: 14px;
  color: #5885b8;
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 20px; // 좋아요 아이콘 크기를 20px로 변경
  margin-right: 5px;
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
`;

const LeftButtons = styled.div`
  display: flex;
  margin-top: 15px;
  margin-left: 15px;
  gap: 10px; // 버튼 사이의 간격 추가
`;

const LikeWrapper = styled.div`
  font-size: 20px;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NameContent = styled.div`
  height: 50px;
  width: 100%;
`;
