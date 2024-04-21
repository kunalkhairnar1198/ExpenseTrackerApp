import React from 'react';
import { Card } from 'react-bootstrap';

const ExpenseItem = (props) => {
    const listOfItems = props.items;

    return (
        <div>
            {listOfItems.map((item) => (
                <Card key={item.id_}>
                    <Card.Body>
                        <Card.Title>{item.description}</Card.Title>
                        <Card.Text>
                            <strong>Price:</strong> {item.price}
                        </Card.Text>
                        <Card.Text>
                            <strong>Category:</strong> {item.category}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default ExpenseItem;
