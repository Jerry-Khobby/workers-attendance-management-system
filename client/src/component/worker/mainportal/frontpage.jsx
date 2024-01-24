import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

const StaticPage = () => {
  // Sample data for cards
  const cardData = [
    {
      id: 1,
      image: 'https://example.com/image1.jpg',
      caption: 'Card 1',
    },
    {
      id: 2,
      image: 'https://example.com/image2.jpg',
      caption: 'Card 2',
    },
    {
        id: 3,
        image: 'https://example.com/image2.jpg',
        caption: 'Card 2',
      },
      {
        id: 4,
        image: 'https://example.com/image2.jpg',
        caption: 'Card 2',
      },
      {
        id: 5,
        image: 'https://example.com/image2.jpg',
        caption: 'Card 2',
      },
  ];

  return (
    <Grid container spacing={3}>
      {cardData.map((card) => (
        <Grid item key={card.id} xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt={card.caption}
              height="140"
              image={card.image}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {card.caption}
              </Typography>
              <Button variant="contained" color="primary">
                Button
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StaticPage;
