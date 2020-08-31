---
layout: default
---

# Gender and Brexit Discourse on Twitter
25th August 2020		Laurence Rowley-Abel

<br>
<img src = "/assets/images/brexit_tweets_page_photo.png" style = "width: 100%; display: block; margin-left: auto; margin-right: auto;">
<br>
<br>
In the campaign leading up to the EU referendum in 2016, and the subsequent years of debate, the politics of Brexit has been about many things, from sovereignty to regulations, public trust in institutions and immigration. Yet one thing has largely been left off the agenda - gender.

Although issues such as EU legislation on women's employment rights have come up at times, they were [never central to the debate](https://ecpr.eu/Events/PaperDetails.aspx?PaperID=33436&EventID=114). The fact that there was no significant difference in the proportions of men and women voting Leave/Remain (according to [British Election Study data](https://www.britishelectionstudy.com/data-objects/panel-study-data/)) has also led [some to argue](https://www.reuters.com/article/us-britain-brexit-women/is-brexit-good-or-bad-for-women-its-divisive-to-even-ask-idUSKCN1RH162) that gender is irrelevant to Brexit. But at the same time, public discussion of Brexit has had a very gendered nature. The call for leaving the EU was largely led by male figures (including the "Bad Boys of Brexit"), but also, [a study](https://blog.lboro.ac.uk/crcc/eu-referendum/gender-balance-eu-referendum-coverage/) from 2016 estimated that 82.5% of the voices, on either side of the debate, included in media coverage of the campaign were male. And more recently, [researchers are finding](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3429689) that attitudes towards gender roles and perceived discrimination against men played a part in the Leave vote.

So how is gender reflected in popular discourse on Brexit? One place to analyse this is Twitter, which has been a hotspot of public debate on the issue. When Britain officially left the EU on the 31st January 2020, there was significant activity around the #Brexit hashtag on the platform, and so in this research we looked at a dataset of #Brexit tweets from that week in order to look at how men and women were talked about in relation to leaving the EU. How much are men and women discussed, is it in the same way, and what topics are people talking about in reference to different genders? 

## A quick look at the data
The data we analysed consists of 157,512 tweets that used the hashtag #Brexit during the period from the 29th January to 4th February 2020. Of these, 44,235 were original tweets, rather than retweets. For most of the analysis we excluded retweets, in order to avoid widely shared tweets being overly influential in the results.

The chart below shows how the tweets were distributed over the week. It's important to note here that the dataset is a sample of the tweets using #Brexit, rather than all tweets with that hashtag. So in the chart below, we're more interested in the relative distribution as opposed to the absolute number of tweets. Not surprisingly, we see higher volumes on the day the UK left and the morning after, with a notable spike around 11pm on the 31st January - the official moment of departure.

<picture>
   <source 
      media="(min-width: 600px) and (max-resolution: 200dpi)"
      srcset="/assets/images/plots/tweet_frequency_over_time.png">
   <source 
      media="(min-width: 100px)"
		      srcset="/assets/images/plots/tweet_frequency_over_time_mobile.png">
   <img src="/assets/images/plots/tweet_frequency_over_time.png" 
   alt="plot of mentions by gender">
</picture>

Before delving into the analysis, it is always worth bearing in mind when looking at Twitter data that [the tweeting population differs](https://journals.sagepub.com/doi/full/10.1177/2053168017720008) from the general UK population in terms of their demographics and political attitudes, though this does not mean that it's not a useful artefact of public discourse. And equally, it's important to note that this analysis is limited in only analysing male and female gender, largely because the methods used rely on binary notions of gender (such as gendered entity recognition based on census data) or linguistic distinctions like "he/she". For some interesting discussion of the limitations of these approaches in text-mining research, have a look [here](https://www.frontiersin.org/articles/10.3389/fdata.2019.00029/full).

## Identifying gendered entities
In order to identify tweets that mentioned someone of a particular gender, two methods were used.

Firstly, a Named Entity Recognition algorithm was run on the tweets in order to extract human names, and then the [gender package](https://docs.ropensci.org/gender/) in R was used to attempt to infer the gender of those mentioned.

Secondly, the names of all current Members of Parliament (MPs) in the UK parliament and, if they were on Twitter, their [Twitter handles](https://www.mpsontwitter.co.uk/list), were searched for in the tweets. There was a particular focus on MPs since, given the political nature of the topic, MPs are often discussed. But also, in the context of Brexit, many [female MPs have highlighted](https://www.theguardian.com/politics/2019/sep/26/abuse-is-virtually-constant-female-mps-speak-about-the-threats-they-face) increasingly hostile rhetoric and abuse directed towards them, especially on social media. In light of this, exploring discourse related to MPs and Brexit would useful.

This resulted in a set of 13,854 tweets in which we had detected a person being mentioned by name, and whose gender we had inferred. As can be seen in the chart below, men were mentioned in a far greater proportion than women, both in general and when just looking at mentions of MPs.

<picture>
   <source 
      media="(min-width: 600px) and (max-resolution: 200dpi)"
      srcset="/assets/images/plots/mentions_by_gender.png">
   <source 
      media="(min-width: 100px)"
		      srcset="/assets/images/plots/mentions_by_gender_mobile.png">
   <img src="/assets/images/plots/mentions_by_gender.png" 
   alt="plot of mentions by gender">
</picture>

This suggests that  the discussion of Brexit on Twitter was largely focused on men, which is consistent with [previous research](https://www.prio.org/Publications/Publication/?x=10651) which has discussed how the Brexit debate has been male-dominated. As is shown above, this is even more true when we consider just the discussion of MPs - in general, tweets mentioning someone mention women 15.01% of the time, but tweets mentioning an MP mention female MPs only 12.02% of the time. This added focus on men when it comes to MPs was largely driven by mentions of Boris Johnson, who was unsurprisingly discussed a lot given that he was Prime Minister. But even when we remove mentions of Boris Johnson, the conversation was still focused on male figures (out of tweets mentioning someone other than the PM, 79.13% mentioned men and 20.87% mentioned women).

So, who are the people being mentioned? By far the most discussed were Boris Johnson and Nigel Farage with 2639 and 1459 mentions respectively. In order to visualise the other people mentioned, we've plotted below the most mentioned names excluding Boris Johnson and Nigel Farage since they dwarfed everyone else.

<picture>
   <source 
      media="(min-width: 600px) and (max-resolution: 200dpi)"
      srcset="/assets/images/plots/most_mentioned_people_stick.png">
   <source 
      media="(min-width: 100px)"
		      srcset="/assets/images/plots/most_mentioned_people_stick_mobile.png">
   <img src="/assets/images/plots/most_mentioned_people_stick_mobile.png" 
   alt="plot of mentions by gender">
</picture>
 
The chart shows that it is mainly MPs being talked about, but several other figures also appear, including other politicians (Donald Trump, Ann Widdecombe), journalists (Laura Kuenssberg), activists involved with Brexit (Gina Miller) and historical figures (Winston Churchill). it again shows that men are being discussed more than women in the tweets, with only 6 of the top 22 mentioned people being female.

We can also see here that there are some figures who you would expect to see mentioned more, but who aren't - for example, the adviser to the Prime Minister, Dominic Cummings. Exploring this highlights some of the limitations of the methods used to find mentions of people in the tweet dataset. People who are mainly referred to by their last name only (such as Cummings) aren't extracted, for example, since their gender cannot be inferred without their first name. Whilst manually searching for people in the tweets would be possible, this would mean that the results would depend on who was searched for and who was not, and so would potentially skew the analysis.

## Is there a relationship between the focus on men and political stance?

So far, we've seen how the set of #Brexit tweets is heavily male-focused, with most people who are tweeted about being men. But we might also ask, is this the same across political divides? Do tweets supporting Leave or Remain talk about different genders in the same proportion as each other, or is one side more male/female-focused than the other? Equally, do tweets discussing one gender support Leave/Remain in the same proportion as tweets discussing the other gender?

In order to answer this we need a way of classifying tweets as pro-Leave or pro-Remain. Previous research has used various text-mining methods for determining political stance of tweets. In relation to Brexit, [one study](https://ieeexplore.ieee.org/document/7836698) has used a hashtag-based analysis to classify tweets as Leave/Remain, whilst [others](https://link.springer.com/article/10.1186/s40649-017-0042-6#Sec15) have used more sophisticated, but also more labour-intensive, machine learning methods based on a subset of tweets that have been pre-classified by humans manually.

In our research, we used an approach that is somewhere in between these two methods. Firstly, a subset of pre-tagged tweets was created using an adapted hashtag-based analysis. All the tweets were then converted into a vector representation using a [word2vec](https://arxiv.org/abs/1301.3781) model in the [gensim](https://radimrehurek.com/gensim/models/word2vec.html) package. A K Nearest Neighbours (KNN) algorithm was then used to classify tweets as Leave or Remain based on their proximity to tweets in the pre-tagged subset.

After running the algorithm, the tweets were classified in the following proportions: 27.21% in favour of Remain, 21.99% in favour of Leave, and 50.81% not classified as either. This is broadly consistent with results found in other studies, which have seen higher support for Remain than Leave on Twitter (largely due to the younger profile of Twitter users compared to the general population).

We now looked at the tweets classified as Leave or Remain that also mentioned somebody in order to see if they differed in the amount they spoke about men/women. The results are shown in the table below.


<table>
	<tr style = "text-align: center; background-color: #F6F4F4">
		<th></th>
		<th colspan = 3>Side tweet supports</th>
		<th></th>
	</tr>
	<tr>
		<td></td>
		<td>Leave</td>
		<td>Remain</td>
		<td>Neither</td>
		<td>Total</td>
	</tr>
	<tr>
		<td>Tweets mentioning women</td>
		<td>15.96%</td>
		<td>16.94%</td>
    <td>15.38%</td>
    <td>15.88%</td>
  </tr>
  <tr>
    <td>Tweets mentioning men</td>
    <td>84.04%</td>
    <td>83.06%</td>
    <td>84.62%</td>
    <td>84.12%</td>
  </tr>
  <tr>
	  <td> N = 9970</td>
	</tr>
</table>

We found that both sides, as well as those tweets classified as neither side, were heavily male-dominated

The results are shown in the plot below.

<picture>
   <source 
      media="(min-width: 600px) and (max-resolution: 200dpi)"
      srcset="/assets/images/plots/gender_by_stance.png">
   <source 
      media="(min-width: 100px)"
		      srcset="/assets/images/plots/gender_by_stance_mobile.png">
   <img src="/assets/images/plots/gender_by_stance.png" 
   alt="plot of mentions by gender">
</picture>
 

The chart shows that there was almost only a 1% gap between pro-Leave and pro-Remain tweets, which was not a statistically significant difference (according to a Chi Square test with p < 0.05). Both sides were far more likely to mention men than women. The same is broadly true when we look at just MPs (as shown in the plot below), where the gap is slightly bigger but still not statistically significant. These small differences could be further investigated with a larger sample of tweets in order to see if pro-Remain tweets are slightly more likely to mention women than pro-Leave tweets, but within this dataset, there is no evidence to suggest the two sides discuss men and women in substantially different proportions to each other. What is evident, is that both pro-Remain discourse and pro-Leave discourse was heavily male-centric.
 
<picture>
   <source 
      media="(min-width: 600px) and (max-resolution: 200dpi)"
      srcset="/assets/images/plots/gender_by_stance_mps_only.png">
   <source 
      media="(min-width: 100px)"
		      srcset="/assets/images/plots/gender_by_stance_mps_only_mobile.png">
   <img src="/assets/images/plots/gender_by_stance_mps_only.png" 
   alt="plot of mentions by gender">
</picture>
 
## What do people tweet about when discussing men and women and Brexit?

So far we have seen how discussion of men is far more prevalent in Brexit tweets than discussion of women. However, we might also ask whether the nature of discourse changes when talking about male and female figures  - are the same topics discussed, and is the language used the same?

To analyse this we took a set of common topics relating to Brexit (trade, immigration, no deal etc.) and created sets of key words for each topic. We then used these key words to find tweets that discussed each topic. This allowed us to see how commonly a topic was discussed, and in particular, to compare how likely they were to be brought up in a tweet that also discusses a man or a woman. The plot below compares tweets mentioning men to tweets mentioning women in terms of how likely they were to talk about a certain topic.

<picture>
   <source 
      media="(min-width: 600px) and (max-resolution: 200dpi)"
      srcset="/assets/images/plots/topic_gender_odds_ratios.png">
   <source 
      media="(min-width: 100px)"
		      srcset="/assets/images/plots/topic_gender_odds_ratios_mobile.png">
   <img src="/assets/images/plots/topic_gender_odds_ratio.png" 
   alt="plot of mentions by gender">
</picture>
 

The chart shows some interesting differences, with tweets talking about men being more likely than tweets that mentioned women to discuss trade, no-deal and the backstop, and sovereignty and independence. On the other hand, tweets discussing women had a greater odds of talking about immigration and democracy than tweets discussing men did. Other topics did not show significant differences in terms of their likelihood of being discussed in relation to men and women. It is worth noting that once tweets have been broken down by both topic and gender the numbers involved are relatively small and so the some of confidence intervals are comparatively large - again, the research would benefit here from a larger sample size.

So who is driving these differences ? Tweets mentioning men were over twice as likely to bring up the topic of trade than those mentioning women. If we look into these tweets, we see that a bunch of male politicians dominate the discourse on trade. Mentions of Boris Johnson are even more prevalent here than these tweets than they are in general, and commentary on a US-UK trade deal mean that Donald Trump is also particularly central to tweets about trade. Liam Fox, the former International Trade Secretary (under Theresa May) is also discussed often in these tweets, notably more so than Liz Truss, despite the fact that she currently holds that position.
<iframe width = "100%" height = 500 frameBorder = 0  src = "/assets/plotly_files/language_plot.html"></iframe>
<iframe width = "100%" height = 200 frameBorder = 0  src = "/assets/plotly_files/language_plot_legend.html"></iframe>

<!--stackedit_data:
eyJoaXN0b3J5IjpbNDEyMTE5OTIyLC0yMDkyNzYwMDk0LDExNj
Y4ODI2OTksNjY0MTE4OTgxLDcwNzkzMzA3NSwxNTM2NjkwNjY5
LDE5MDEyMTYyNjQsNzUxNzUwMzY2LC0xOTE0MDQ1NzE3LDgyOT
Q1MzI3MCwxMDU2OTE1NTUxLC0xMzMyMjczODQzLDE5NTA3MTc1
NSwxMzAzMzc2MDM5LDE3NzAyODQ5NjcsLTg1NDk4Nzc2MiwtMT
IxMTM0OTk4MSwtMTI2MjU1NDk5LDE0MjI1Mzk3ODUsMTE0MDk3
MjQzNV19
-->