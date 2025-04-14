# Mapbox Clustering

## Setup
Welcome to my mapbox data clustering project, if you're looking to pull this down and try
it out, you'll need a couple things.
- A data set (converted to a file called raw.csv)
- Some changes to CsvToGeoJSON (you'll have to update the type with your data set's columns)
- A mapbox studio account
- This works best with a very large dataset, the one I used was ~800k records.

When you have your data set, begin with creating your tile sets. You will need two tile sets created
- clustered set called 'data'
- unclustered set called 'unclustered'

Once you have those sets, you will be able to start playing around.

## Creating a tileset
Requires [tilesets cli](https://pypi.org/project/mapbox-tilesets/) from mapbox

Create a source
`tilesets add-source {account} data ./data.geojsonld`

Create a tile set using the provided source and recipe
`tilesets create {account}.data --recipe ./recipe.json --name "Data"`

Publish the tile set
`tilesets publish {account}.data`
