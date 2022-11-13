# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. First I would create a new table called Facilities_Agent that contains Facilities_Custom_Agent_ID to Agent_ID (that came from the Agent table) that is already being generated in the report. This table should be a one-to-one relationship as the Facilities_Custom_Agent_ID for each Agent should be unique. To create a new table like this and define the relationship of the table won't take more than an hour.

2. The Shifts table, should now have a new column that contains the foreign key Facilities_Custom_Agent_ID. If there was a column for Agent_ID, that is no longer needed since now we are able to :

- Find the shifts
- Get the Facilities_Custom_Agent_ID and use the Facilities_Agent to find the appropriate Agent that is connected to that custom ID.
  Adding a column to the Shifts table is also not too much of a difficulty. HOWEVER, if there are prior shifts in the Shift table in the database, we will need to make sure each of those previous data now also contains the correct Facilities_Custom_Agent_ID column instead of the old Agent_ID column, which might take more time, depending on how much previous data there is in the database before changing the structure of the table.

3. generateReport function now returns a list of Shifts that contain the the custom Facilities_Custom_Agent_ID, but we will need to update the function to use Facilities_Agent table to get the Agent_ID from Facilities_Custom_Agent_ID and generate the correct AgentID information. Make sure to update all prior data in the database to reflect these changes so that we do not return the wrong Agent information
