import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ISuperhero } from '../../types';
import { ROUTE_CONSTANTS as ROUTE } from '../../app-constants';
import './hero-item.scss';

interface IProps {
  hero: ISuperhero,
}

export const HeroItem = ({ hero }: IProps) => {
  const { nickname, origin_description: originDescription, images } = hero;

  return (
    <div className="hero-item">
      <Card className="hero-item__card">
        <Link to={`${ROUTE.MAIN_PAGE}${nickname}`}>
          <CardActionArea sx={{ height: 350 }}>
            <CardMedia
              sx={{ objectPosition: 'center top' }}
              component="img"
              height="200"
              image={`data:image/png;base64,${images[0]}`}
              alt={nickname}
            />
            <CardContent>
              <Typography variant="h5" color="text.primary" component="div">
                {nickname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {originDescription}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </div>
  );
};
