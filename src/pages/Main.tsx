import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";

type Props = {
  availableTags: Tag[];
  notes: Note[];
};

const Main = ({ availableTags, notes }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  /** 1) note başlığı birinci inputta aratılan metni içermelidir. Notun başlığının 
  küçük harfe çevrilmiş hali aratılan metnin küçük harfe çevrilmiş halini içeriyorsa  kosul saglanır.
   2. input ile seçilen etiketler notun içerisinde ki etiketler ile birebir eşleşmelidir
   seçilen etiketler dizisindeki her bir etiket için nota ait  etiketler arasında eşleşme kontrolu yapacağız
  
  
  
 */

  const filtredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()) &&
          selectedTags.every((s_tag) =>
            note.tags.some((note_tag) => note_tag.value === s_tag.value)
          )
      ),
    [query, selectedTags]);

  return (
    <Container className="mx-auto py-5">
      {/**üst kısım */}
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <div className="d-flex gap-3 align-items-center">
          <img width={45} src="/note_logo_2.png" alt="note-logo" />
          <h1>Notlar</h1>
        </div>

        <Link to={"/new"}>
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      {/**form alanı */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control onChange={(e) => setQuery(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etikete Göre Ara</Form.Label>
              <ReactSelect
                onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                options={availableTags}
                isMulti
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/**note listesi ekrana bas */}
      <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 g-4">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <Card note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Main;
