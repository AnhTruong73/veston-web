import { Row, Col, Card, Typography } from 'antd';
const { Title } = Typography;

const DashboardRow = ({ dataSource }) => {
  return (
    <Row className="rowgap-vbox" gutter={[24, 0]}>
      {dataSource.map((c, index) => (
        <Col
          key={index}
          xs={24}
          sm={24}
          md={12}
          lg={6}
          xl={6}
          className="mb-24"
        >
          <Card bordered={false} className="criclebox">
            <div className="number">
              <Row align="middle" gutter={[24, 0]}>
                <Col xs={18}>
                  <span>{c.today}</span>
                  <Title level={3}>
                    {c.title} <small className={c.bnb}>{c.persent}</small>
                  </Title>
                </Col>
                <Col xs={6}>
                  <div className="icon-box">{c.icon}</div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardRow;
