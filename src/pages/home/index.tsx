import { useState } from 'react';
import axios from 'axios';

import {
  Container,
  Layout,
  SectionTitle,
  SectionInput,
  SectionSearch,
  HeaderSearch,
  IConAudio,
  BodyMeaning,
} from '../../styles/pages/home';
import { Input } from '../../components';

type IGetWord = {
  error?: boolean;
  data?: IDataType;
  errorMsg?: String;
};

type IDataType = {
  audio: String;
  meaning: IMeanings[];
  allMeaning: String[];
  word: String;
};

type IAudio = {
  audio: String;
};

type IMeanings = {
  antonyms: String[];
  definitions: IMeaningsDetail[];
  partOfSpeech: String;
  synonyms: String[];
};

type IMeaningsDetail = {
  antonyms: String[];
  definition: String;
  example: String;
  synonyms: String[];
};

export default function Index() {
  const [value, SetValue] = useState<String | undefined>();
  const [postData, updatePostData] = useState<IGetWord>({
    data: undefined,
    error: undefined,
    errorMsg: undefined,
  });
  const [loading, setLoading] = useState({
    status: false,
    msg: '',
  });

  const fechApi = async (word: String) => {
    setLoading({
      status: true,
      msg: `Pesquisando por: ${word}`,
    });
    await axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        const allMeaning: String[] = [];
        response.data[0].meanings.map((value: IMeanings) => {
          return allMeaning.push(value.partOfSpeech);
        });

        const getAudio = response.data[0].phonetics.find(
          (value: IAudio) => value.audio !== '',
        );

        const data = {
          word: response.data[0].word,
          allMeaning,
          meaning: response.data[0].meanings,
          audio: getAudio.audio,
        };
        console.log(data);
        updatePostData({
          data,
          error: false,
        });
      })
      .catch(() => {
        updatePostData({
          data: undefined,
          error: true,
          errorMsg: `We couldnt find any results for the word: ${word}`,
        });
      });
    setLoading({
      status: false,
      msg: ``,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetValue(e.target.value);
    updatePostData({
      error: false,
      errorMsg: '',
      ...postData,
    });
  };

  const handleOnKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value) {
      await fechApi(String(value));
    }
  };

  const handlePlayAudio = (audio: string) => {
    try {
      const song = new Audio(audio);
      song.play();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <Container>
        <SectionTitle>
          <h1>English Dictionary</h1>
        </SectionTitle>
        <SectionInput>
          <Input
            onChange={(e) => handleChange(e)}
            onKeyDown={handleOnKeyDown}
          />
        </SectionInput>
        {loading.status && (
          <div style={{ marginTop: 10 }}>
            <p>{loading.msg}</p>
          </div>
        )}

        {postData.error && (
          <div style={{ marginTop: 10 }}>
            <p>{postData.errorMsg}</p>
          </div>
        )}

        {postData.data && (
          <SectionSearch>
            <HeaderSearch>
              <div>
                <div>
                  <h3>{postData.data.word}</h3>
                </div>

                <div style={{ marginTop: 5 }}>
                  {postData.data.allMeaning.length !== 0 && (
                    <>
                      {postData.data.allMeaning.map((value) => (
                        <span>{value} / </span>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div>
                <IConAudio
                  onClick={() => handlePlayAudio(String(postData.data?.audio))}
                />
              </div>
            </HeaderSearch>
            {postData.data.meaning.length !== 0 && (
              <>
                {postData.data.meaning.map((value) => (
                  <BodyMeaning>
                    <h3>{value.partOfSpeech}</h3>

                    <div style={{ marginTop: 10 }}>
                      <h4>Definition</h4>
                      <span>{value.definitions[0].definition}</span>
                    </div>
                    {value.antonyms.length !== 0 && (
                      <div style={{ marginTop: 10 }}>
                        <h4>example</h4>
                        <span>{value.definitions[0].example}</span>
                      </div>
                    )}

                    {value.antonyms.length !== 0 && (
                      <>
                        <div style={{ marginTop: 10 }}>
                          <h3>synonyms</h3>
                          {value.synonyms.map((value: String) => (
                            <span>{value} / </span>
                          ))}
                        </div>
                      </>
                    )}

                    {value.antonyms.length !== 0 && (
                      <>
                        <div style={{ marginTop: 10 }}>
                          <h3>antonyms</h3>
                          {value.antonyms.map((value: String) => (
                            <span>{value} / </span>
                          ))}
                        </div>
                      </>
                    )}
                  </BodyMeaning>
                ))}
              </>
            )}
          </SectionSearch>
        )}
      </Container>
    </Layout>
  );
}
