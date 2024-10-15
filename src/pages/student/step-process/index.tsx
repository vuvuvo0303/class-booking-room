import { Button, message, Steps, theme } from "antd"
import { useState } from "react";
import FillInformation from "./FillInformation";
import ScanFace from "./ScanFace";
import ConfirmInfo from "./ConfirmInfo";
import Done from "./Done";


const StepProcess = () => {
    const steps = [
        {
          title: 'Fill Information',
          content: <FillInformation/>,
        },
        {
          title: 'Scan Your Face',
          content: <ScanFace/>,
        },
        {
          title: 'Confirm Your Information',
          content: <ConfirmInfo/>,
        },
        {
            title: 'Done',
            content: <Done/>,
          },
      ];
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
  
    const next = () => {
      setCurrent(current + 1);
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };
  
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
  
    const contentStyle: React.CSSProperties = {
      lineHeight: '260px',
      textAlign: 'center',
      color: token.colorTextTertiary,
      backgroundColor: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: `1px dashed ${token.colorBorder}`,
      marginTop: 16,
    };
  
  return (
    <div className="py-20 px-5">
    <Steps current={current} items={items} />
    <div style={contentStyle}>{steps[current].content}</div>
    <div style={{ marginTop: 24 }}>
      {current < steps.length - 1 && (
        <Button type="primary" onClick={() => next()}>
          Next
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button type="primary" onClick={() => message.success('Processing complete!')}>
          Done
        </Button>
      )}
      {current > 0 && (
        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
          Previous
        </Button>
      )}
    </div>
  </div>
  )
}

export default StepProcess