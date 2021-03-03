import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from '../components/TabOverview'
import Card from '../components/Card'
import { Icon } from '../components/Icon'
import SEO from '../components/SEO'

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 3rem 2rem;
  @media (max-width: 600px) {
    padding: 2rem 1rem 2rem 1rem;
  }
`

const Title = styled.h1`
  span {
    color: var(--primary);
  }
  margin-bottom: 6rem;
`

const SmallTitle = styled.h2`
  color: var(--white);
  font-weight: 500;
  font-size: 1rem;
`

const Legend = styled.div`
  margin-bottom: 3rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: var(--br);
  font-size: 0.8rem;
  [data-name='next'],
  [data-name='first'],
  [data-name='star'],
  [data-name='episodes'],
  [data-name='seasons'] {
    fill: var(--grey-light);
  }
  h2 {
    margin-top: 0;
    color: var(--grey-light);
  }
`

const LegendWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  div {
    display: flex;
    align-items: center;
    color: var(--grey);
    padding: 0.5rem 1.25rem 0.5rem 0;
  }
  [data-item='custom-icon'] {
    margin-right: 0.4rem;
    width: 1.25rem;
    height: 1.25rem;
  }
`

const Row = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 3rem;
`

const Column = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-basis: 100%;
  max-width: 100%;
  width: 100%;
  margin-bottom: 2.5rem;
  @media screen and (min-width: 321px) {
    flex-basis: calc(99.9% * 1 / 2 - 0.5rem);
    max-width: calc(99.9% * 1 / 2 - 0.5rem);
    width: calc(99.9% * 1 / 2 - 0.5rem);
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 700px) {
    flex-basis: calc(99.9% * 1 / 3 - 1rem);
    max-width: calc(99.9% * 1 / 3 - 1rem);
    width: calc(99.9% * 1 / 3 - 1rem);
    margin-bottom: 2rem;
  }
  @media screen and (min-width: 1000px) {
    flex-basis: calc(99.9% * 1 / 3 - 1.5rem);
    max-width: calc(99.9% * 1 / 3 - 1.5rem);
    width: calc(99.9% * 1 / 3 - 1.5rem);
    margin-bottom: 2.5rem;
  }
`

const BigTab = styled(Tab)`
  padding: 0.3rem 1rem;
  border-radius: var(--br);
  color: var(--grey);
  font-weight: 500;
  font-size: 1.5rem;
  background: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  &.selected {
    background: rgba(0, 0, 0, 0.1);
    color: var(--white);
  }
  &:not(.selected) {
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`

const Desc = styled.div`
  background: rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: var(--br);
`

const IndexPage = ({ data: { info, favMovies, watchedMovies } }) => (
  <Wrapper>
    <SEO />
    <header>
      <Title>
        Movies listed by<span> {info.name} </span>
      </Title>
      <Legend>
        <SmallTitle>Legend</SmallTitle>
        <LegendWrapper>
          <div>
            <Icon name="star" /> Rating
          </div>
          <div>
            <Icon name="first" /> Release
          </div>
          <div>
            <Icon name="next" /> Next Episode
          </div>
          <div>
            <Icon name="episodes" /> Episodes
          </div>
          <div>
            <Icon name="seasons" /> Seasons
          </div>
          <div>
            <Icon name="running" /> Returning Series
          </div>
          <div>
            <Icon name="ended" /> Ended
          </div>
        </LegendWrapper>
      </Legend>
    </header>
    <main>
      <Tabs forceRenderTabPanel>
        <TabList>
          <BigTab>Favorites</BigTab>
          <BigTab>Watchlist</BigTab>
        </TabList>
        <TabPanel>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>Movies ({favMovies.totalCount})</Tab>
            </TabList>
            <TabPanel>
              <Row>
                {favMovies.nodes.map(movie => (
                  <Column key={movie.title}>
                    <Card
                      link={`movie/${movie.accountFavoriteMoviesId}`}
                      cover={movie.poster_path.childImageSharp.fixed}
                      name={movie.title}
                      rating={movie.vote_average}
                      release={movie.release_date}
                    />
                  </Column>
                ))}
              </Row>
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <Tabs forceRenderTabPanel>
            <TabList>
              <Tab>Movies ({watchedMovies.totalCount})</Tab>
            </TabList>
            <TabPanel>
              <Row>
                {watchedMovies.nodes.map(movie => (
                  <Column key={movie.title}>
                    <Card
                      link={`movie/${movie.accountMovieWatchlistId}`}
                      cover={movie.poster_path.childImageSharp.fixed}
                      name={movie.title}
                      rating={movie.vote_average}
                      release={movie.release_date}
                    />
                  </Column>
                ))}
              </Row>
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </main>
  </Wrapper>
)

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.shape({
    info: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    favMovies: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      nodes: PropTypes.array.isRequired,
    }).isRequired,
    watchedMovies: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      nodes: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    info: tmdbAccountInfo {
      name
    }
    favMovies: allTmdbAccountFavoriteMovies(sort: { fields: [vote_average], order: DESC }) {
      totalCount
      nodes {
        release_date
        vote_average
        title
        accountFavoriteMoviesId
        poster_path {
          childImageSharp {
            fixed(height: 525, quality: 90) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
    watchedMovies: allTmdbAccountMovieWatchlist(sort: { fields: [release_date], order: DESC }) {
      totalCount
      nodes {
        release_date
        vote_average
        accountMovieWatchlistId
        title
        poster_path {
          childImageSharp {
            fixed(height: 525, quality: 90) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  }
`
