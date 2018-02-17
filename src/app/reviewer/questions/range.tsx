import * as React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

export function Range() {
  return (
    <ButtonGroup>
      {Array.apply(null, {length: 11}).map(Number.call, Number).map((i: number) => (
        <Button
          key={i}
          size="sm"
        >
          {i}
        </Button>
      ))}
    </ButtonGroup>
  );
}
