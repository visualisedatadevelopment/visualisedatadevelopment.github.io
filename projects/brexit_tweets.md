---

---

# Gender and Brexit Discourse on Twitter
In the campaign leading up to the EU referendum in 2016, and the subsequent years of debate, the politics of Brexit has been about many things, from sovereignty to regulations, public trust in institutions and immigration. Yet one thing has largely been left off the agenda - gender.

Although issues such as EU legislation on women's employment rights have come up at times, they were [never central to the debate](https://ecpr.eu/Events/PaperDetails.aspx?PaperID=33436&EventID=114). The fact that there was no significant difference in the proportions of men and women voting Leave/Remain (according to [British Election Study data](https://www.britishelectionstudy.com/data-objects/panel-study-data/)) has also led [some to argue](https://www.reuters.com/article/us-britain-brexit-women/is-brexit-good-or-bad-for-women-its-divisive-to-even-ask-idUSKCN1RH162) that gender is irrelevant to Brexit. But at the same time, public discussion of Brexit has had a very gendered nature. The call for leaving the EU was largely led by male figures (including the "Bad Boys of Brexit"), but also, [a study](https://blog.lboro.ac.uk/crcc/eu-referendum/gender-balance-eu-referendum-coverage/) from 2016 estimated that 82.5% of the voices, on either side of the debate, included in media coverage of the campaign were male. And more recently, [researchers are finding](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3429689) that attitudes towards gender roles and perceived discrimination against men played a part in the Leave vote.

So how is gender reflected in popular discourse on Brexit? One place to analyse this is Twitter, which has been a hotspot of public debate on the issue. When Britain officially left the EU on the 31st January 2020, there was significant activity around the #Brexit hashtag on the platform, and so in this research we looked at a dataset of #Brexit tweets from that week in order to look at how men and women were talked about in relation to leaving the EU. How much are men and women discussed, is it in the same way, and what topics are people talking about in reference to different genders? 

## A quick look at the data
The data we analysed consists of 157,512 tweets that used the hashtag #Brexit during the period from the 29th January to 4th February 2020. Of these, 44,235 were original tweets, rather than retweets. For most of the analysis we excluded retweets, in order to avoid widely shared tweets being overly influential in the results.

The chart below shows how the tweets were distributed over the week. It's important to note here that the dataset is a sample of the tweets using #Brexit, rather than all tweets with that hashtag. So in the chart below, we're more interested in the relative distribution as opposed to the absolute number of tweets. Not surprisingly, we see higher volumes on the day the UK left and the morning after, with a notable spike around 11pm on the 31st January - the official moment of departure.

![Plot of tweet frequency over time](/assets/images/plots/tweet_frequency_over_time.png)

Before delving into the analysis, it is always worth bearing in mind when looking at Twitter data that [the tweeting population differs](https://journals.sagepub.com/doi/full/10.1177/2053168017720008) from the general UK population in terms of their demographics and political attitudes, though this does not mean that it's not a useful artefact of public discourse. And equally, it's important to note that this analysis is limited in only analysing male and female gender, largely because the methods used rely on binary notions of gender (such as gendered entity recognition based on census data) or linguistic distinctions like "he/she". For some interesting discussion of the limitations of these approaches in text-mining research, have a look [here](https://www.frontiersin.org/articles/10.3389/fdata.2019.00029/full).

## Identifying gendered entities
In order to identify tweets that mentioned someone of a particular gender, two methods were used.

Firstly, a Named Entity Recognition algorithm was run on the tweets in order to extract human names, and then the [gender package](https://docs.ropensci.org/gender/) in R was used to attempt to infer the gender of those mentioned.

Secondly, the names of all current MPs in the UK parliament and, if they were on Twitter, their [Twitter handles](https://www.mpsontwitter.co.uk/list), were searched for in the tweets. There was a particular focus on MPs since, given the political nature of the topic, MPs are often discussed. But also, in the context of Brexit, many [female MPs have highlighted](https://www.theguardian.com/politics/2019/sep/26/abuse-is-virtually-constant-female-mps-speak-about-the-threats-they-face) increasingly hostile rhetoric and abuse directed towards them, especially on social media. In light of this, exploring discourse related to MPs and Brexit would useful.

This resulted in a set of 13,854 tweets in which we had detected a person being mentioned by name, and whose gender we had inferred. Of these, 3728 were tweets mentioning an MP. As can be seen in the chart below, men were mentioned in a far greater proportion than women, both in general and when just looking at mentions of MPs.

![Plot of tweets mentioning men and women](/assets/images/plots/mentions_by_gender.png)

This suggests that  the discussion of Brexit on Twitter was largely focused on men, which is consistent with previous research which has  
 









<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3NDE5MjgxMDEsLTc5NjQ2NjEwMCwxNT
g5Mjc0MTIsMjgyNDY1ODQ5LC0zNTQ1NzUyMDcsMTY4NjQ4MDgw
OSw2NjMwOTg5MTUsLTQ1OTI0MDMwNSwtMTA2NjQ0Nzk5LC01OD
kwOTk2MjMsLTE4MjE5MzgxNywxMTA0MDUyODIwLC02MTEwMTkx
MzAsMjA5Nzk5MTA1MywtMTUxMjk3Njg1MV19
-->