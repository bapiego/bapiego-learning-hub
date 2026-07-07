insert into quizzes (slug, course_code, day_number, title, time_limit_minutes)
values ('bba251-day1', 'BBA251', 1, 'Day 1 Quick Test — The Economic Problem & the PPF', 10)
on conflict (slug) do update set title = excluded.title;

delete from questions where quiz_id = (select id from quizzes where slug = 'bba251-day1');

insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 1, 'Economics is best defined as the study of:', 'mcq', '[{"key":"a","text":"how governments print money"},{"key":"b","text":"how society allocates scarce resources among unlimited wants"},{"key":"c","text":"how to become wealthy"},{"key":"d","text":"the stock market"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day1';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 2, 'Which of the following best illustrates “opportunity cost”?', 'mcq', '[{"key":"a","text":"The price tag on a textbook"},{"key":"b","text":"The value of the next-best alternative given up when a choice is made"},{"key":"c","text":"The total cost of production"},{"key":"d","text":"The interest rate on a loan"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day1';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 3, '“Unemployment in Ghana rose to 12% last quarter” is an example of a:', 'mcq', '[{"key":"a","text":"Normative statement"},{"key":"b","text":"Positive statement"},{"key":"c","text":"Microeconomic policy"},{"key":"d","text":"Command economy rule"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day1';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 4, 'Which question is NOT one of the three basic economic questions?', 'mcq', '[{"key":"a","text":"What to produce?"},{"key":"b","text":"How to produce?"},{"key":"c","text":"When was money invented?"},{"key":"d","text":"For whom to produce?"}]'::jsonb, 'c', null from quizzes where slug = 'bba251-day1';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 5, 'In a command economy, resource allocation decisions are primarily made by:', 'mcq', '[{"key":"a","text":"the price mechanism"},{"key":"b","text":"individual consumers"},{"key":"c","text":"the central government"},{"key":"d","text":"private firms competing freely"}]'::jsonb, 'c', null from quizzes where slug = 'bba251-day1';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 6, 'TRUE or FALSE: A point lying inside the PPF represents an efficient use of resources.', 'tf', null, 'false', 'FALSE — a point inside the PPF is inefficient (resources are idle or misallocated); only points ON the curve are efficient.' from quizzes where slug = 'bba251-day1';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 7, 'TRUE or FALSE: An outward shift of the entire PPF represents economic growth.', 'tf', null, 'true', 'TRUE — an outward shift of the whole PPF represents economic growth (more resources or improved technology).' from quizzes where slug = 'bba251-day1';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 8, 'Name the FOUR factors of production.', 'short', null, null, 'Land, Labour, Capital, Entrepreneurship.' from quizzes where slug = 'bba251-day1';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 9, 'Briefly explain, in one sentence, why the PPF is normally bowed outward (concave to the origin).', 'short', null, null, 'Because resources are not perfectly adaptable between the two goods, so opportunity cost rises as more of one good is produced, giving the curve its concave, bowed-outward shape.' from quizzes where slug = 'bba251-day1';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 10, 'A student can spend the evening either studying economics or working a part-time job for GH¢50. If she chooses to study, what is her opportunity cost?', 'short', null, null, 'GH¢50 — the wages she forgoes by not taking the part-time job.' from quizzes where slug = 'bba251-day1';

insert into quizzes (slug, course_code, day_number, title, time_limit_minutes)
values ('bba251-day2', 'BBA251', 2, 'Day 2 Quick Test — Demand, Supply, Equilibrium & Elasticity', 10)
on conflict (slug) do update set title = excluded.title;

delete from questions where quiz_id = (select id from quizzes where slug = 'bba251-day2');

insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 1, 'The law of demand states that, ceteris paribus:', 'mcq', '[{"key":"a","text":"price and quantity demanded move in the same direction"},{"key":"b","text":"price and quantity demanded move in opposite directions"},{"key":"c","text":"quantity demanded is unrelated to price"},{"key":"d","text":"demand always exceeds supply"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day2';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 2, 'A rise in the price of a good causes:', 'mcq', '[{"key":"a","text":"a shift of the demand curve"},{"key":"b","text":"a movement along the demand curve"},{"key":"c","text":"a shift of the supply curve only"},{"key":"d","text":"no change in the market"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day2';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 3, 'Given Qd = 120 − 3P and Qs = 30 + 2P, find the equilibrium price (P*) and quantity (Q*). Show your working.', 'short', null, null, 'Set Qd = Qs: 120 − 3P = 30 + 2P → 90 = 5P → P* = 18. Q* = 120 − 3(18) = 66 units.' from quizzes where slug = 'bba251-day2';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 4, 'A price ceiling set BELOW the equilibrium price will most likely cause a:', 'mcq', '[{"key":"a","text":"surplus"},{"key":"b","text":"shortage"},{"key":"c","text":"fall in demand"},{"key":"d","text":"rise in supply"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day2';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 5, 'A price floor (e.g. minimum wage) set ABOVE the equilibrium wage will most likely cause a:', 'mcq', '[{"key":"a","text":"labour shortage"},{"key":"b","text":"labour surplus (unemployment)"},{"key":"c","text":"equilibrium wage to rise further"},{"key":"d","text":"no effect"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day2';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 6, 'If a 10% rise in price causes a 30% fall in quantity demanded, calculate the price elasticity of demand (PED) and state whether demand is elastic or inelastic.', 'short', null, null, 'PED = −30% ÷ 10% = −3.0 → |PED| = 3 > 1 → demand is elastic.' from quizzes where slug = 'bba251-day2';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 7, 'Which of the following goods is likely to have the MOST inelastic demand?', 'mcq', '[{"key":"a","text":"Life-saving insulin"},{"key":"b","text":"Restaurant meals"},{"key":"c","text":"Cinema tickets"},{"key":"d","text":"Branded sneakers"}]'::jsonb, 'a', null from quizzes where slug = 'bba251-day2';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 8, 'If a good has a negative income elasticity of demand (YED), it is classified as a(n):', 'mcq', '[{"key":"a","text":"normal good"},{"key":"b","text":"inferior good"},{"key":"c","text":"substitute good"},{"key":"d","text":"complementary good"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day2';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 9, 'A positive cross elasticity of demand (XED) between two goods indicates that they are:', 'mcq', '[{"key":"a","text":"complements"},{"key":"b","text":"substitutes"},{"key":"c","text":"unrelated"},{"key":"d","text":"inferior goods"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day2';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 10, 'When a tax is imposed on a good, which side of the market (buyers or sellers) bears the LARGER share of the tax burden if demand is more price-inelastic than supply? Explain briefly.', 'short', null, null, 'Buyers bear the larger share — the side of the market with the more inelastic response is less able to adjust quantity, so it ends up absorbing more of the tax.' from quizzes where slug = 'bba251-day2';

insert into quizzes (slug, course_code, day_number, title, time_limit_minutes)
values ('bba251-day3', 'BBA251', 3, 'Day 3 Quick Test — Consumer Behaviour & Theory of Production', 10)
on conflict (slug) do update set title = excluded.title;

delete from questions where quiz_id = (select id from quizzes where slug = 'bba251-day3');

insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 1, 'Marginal utility (MU) is defined as:', 'mcq', '[{"key":"a","text":"total satisfaction from all units consumed"},{"key":"b","text":"the additional satisfaction from consuming one more unit"},{"key":"c","text":"the price of the last unit bought"},{"key":"d","text":"average satisfaction per cedi spent"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day3';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 2, 'The law of diminishing marginal utility states that:', 'mcq', '[{"key":"a","text":"MU rises indefinitely as consumption increases"},{"key":"b","text":"MU eventually falls as successive units are consumed"},{"key":"c","text":"TU always falls as consumption increases"},{"key":"d","text":"MU is constant regardless of quantity"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day3';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 3, 'Given TU values of 12, 22, 30, 36 for units 1–4, calculate the marginal utility of the 3rd and 4th units.', 'short', null, null, 'MU(3rd) = 30 − 22 = 8; MU(4th) = 36 − 30 = 6.' from quizzes where slug = 'bba251-day3';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 4, 'A consumer is in equilibrium between goods X and Y when:', 'mcq', '[{"key":"a","text":"Px = Py"},{"key":"b","text":"MUx = MUy"},{"key":"c","text":"MUx / Px = MUy / Py"},{"key":"d","text":"TUx = TUy"}]'::jsonb, 'c', null from quizzes where slug = 'bba251-day3';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 5, 'In the short run, a firm''s production is characterised by:', 'mcq', '[{"key":"a","text":"all inputs being variable"},{"key":"b","text":"at least one fixed input"},{"key":"c","text":"zero fixed costs"},{"key":"d","text":"no labour input"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day3';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 6, 'Given TP = 33 units from 3 workers, calculate the average product (AP) of labour.', 'short', null, null, 'AP = TP ÷ L = 33 ÷ 3 = 11 units per worker.' from quizzes where slug = 'bba251-day3';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 7, 'Given TP of 40 at L=4 and TP of 42 at L=5, calculate the marginal product (MP) of the 5th worker.', 'short', null, null, 'MP = ΔTP ÷ ΔL = (42 − 40) ÷ (5 − 4) = 2 units.' from quizzes where slug = 'bba251-day3';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 8, 'The stage of production where marginal product is falling but still positive is known as Stage:', 'mcq', '[{"key":"a","text":"I — increasing returns"},{"key":"b","text":"II — diminishing returns (the rational stage)"},{"key":"c","text":"III — negative returns"},{"key":"d","text":"None of the above"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day3';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 9, 'If a firm doubles both labour and capital and output MORE than doubles, this illustrates:', 'mcq', '[{"key":"a","text":"decreasing returns to scale"},{"key":"b","text":"constant returns to scale"},{"key":"c","text":"increasing returns to scale"},{"key":"d","text":"diminishing marginal utility"}]'::jsonb, 'c', null from quizzes where slug = 'bba251-day3';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 10, 'Briefly distinguish between the short run and the long run in production theory.', 'short', null, null, 'Short run: at least one input (usually capital) is fixed, only labour/variable inputs can change. Long run: all inputs, including capital, are variable.' from quizzes where slug = 'bba251-day3';

insert into quizzes (slug, course_code, day_number, title, time_limit_minutes)
values ('bba251-day4', 'BBA251', 4, 'Day 4 Quick Test — Theory of Costs and Revenue', 10)
on conflict (slug) do update set title = excluded.title;

delete from questions where quiz_id = (select id from quizzes where slug = 'bba251-day4');

insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 1, 'Implicit costs are best described as:', 'mcq', '[{"key":"a","text":"direct cash payments for inputs"},{"key":"b","text":"the opportunity cost of using self-owned resources"},{"key":"c","text":"costs recorded only in accounting statements"},{"key":"d","text":"costs that never affect profit"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day4';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 2, 'Economic profit differs from accounting profit because economic profit also subtracts:', 'mcq', '[{"key":"a","text":"explicit costs only"},{"key":"b","text":"implicit (opportunity) costs"},{"key":"c","text":"taxes only"},{"key":"d","text":"nothing — they are identical"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day4';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 3, 'If TFC = GH¢200 and Q = 50 units, calculate the Average Fixed Cost (AFC).', 'short', null, null, 'AFC = TFC ÷ Q = 200 ÷ 50 = GH¢4.00.' from quizzes where slug = 'bba251-day4';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 4, 'If total cost rises from GH¢150 to GH¢180 when output rises from 4 to 5 units, calculate the marginal cost (MC) of the 5th unit.', 'short', null, null, 'MC = ΔTC ÷ ΔQ = (180 − 150) ÷ (5 − 4) = GH¢30.' from quizzes where slug = 'bba251-day4';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 5, 'The marginal cost (MC) curve intersects the average total cost (ATC) curve at:', 'mcq', '[{"key":"a","text":"the maximum point of ATC"},{"key":"b","text":"the minimum point of ATC"},{"key":"c","text":"the point where MC = AFC"},{"key":"d","text":"It never intersects ATC"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day4';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 6, 'Economies of scale occur when:', 'mcq', '[{"key":"a","text":"LRAC rises as output increases"},{"key":"b","text":"LRAC falls as output increases"},{"key":"c","text":"TFC rises as output increases"},{"key":"d","text":"MC is constant at all output levels"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day4';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 7, 'Diseconomies of scale are most likely caused by:', 'mcq', '[{"key":"a","text":"bulk-buying discounts"},{"key":"b","text":"coordination and communication problems in very large firms"},{"key":"c","text":"specialisation of labour"},{"key":"d","text":"falling input prices"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day4';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 8, 'If price = GH¢5 and quantity sold = 200 units, calculate Total Revenue (TR).', 'short', null, null, 'TR = P × Q = 5 × 200 = GH¢1,000.' from quizzes where slug = 'bba251-day4';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 9, 'For a monopolist, marginal revenue (MR) is:', 'mcq', '[{"key":"a","text":"always equal to AR"},{"key":"b","text":"always above AR"},{"key":"c","text":"always below AR"},{"key":"d","text":"irrelevant to pricing decisions"}]'::jsonb, 'c', null from quizzes where slug = 'bba251-day4';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 10, 'A firm faces MC = 4 + 2Q and MR = 20. At what output level (Q) does the firm maximise profit (where MR = MC)? Show your working.', 'short', null, null, 'Set MR = MC: 20 = 4 + 2Q → 16 = 2Q → Q = 8 units.' from quizzes where slug = 'bba251-day4';

insert into quizzes (slug, course_code, day_number, title, time_limit_minutes)
values ('bba251-day5', 'BBA251', 5, 'Day 5 Quick Test — Market Structures & National Income', 10)
on conflict (slug) do update set title = excluded.title;

delete from questions where quiz_id = (select id from quizzes where slug = 'bba251-day5');

insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 1, 'Which market structure is characterised by many firms, an identical product, and free entry/exit?', 'mcq', '[{"key":"a","text":"Monopoly"},{"key":"b","text":"Perfect competition"},{"key":"c","text":"Oligopoly"},{"key":"d","text":"Monopolistic competition"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day5';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 2, 'A monopolist is best described as a:', 'mcq', '[{"key":"a","text":"price taker"},{"key":"b","text":"price maker"},{"key":"c","text":"quantity taker"},{"key":"d","text":"perfect competitor"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day5';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 3, 'In perfect competition, the condition P = MR = AR holds because:', 'mcq', '[{"key":"a","text":"the firm can set any price it wants"},{"key":"b","text":"the firm is too small to influence the market price"},{"key":"c","text":"the firm has a monopoly over its product"},{"key":"d","text":"government fixes the price"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day5';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 4, 'Monopolistic competition is distinguished from perfect competition mainly by:', 'mcq', '[{"key":"a","text":"the number of firms"},{"key":"b","text":"product differentiation"},{"key":"c","text":"the existence of barriers to entry"},{"key":"d","text":"government regulation"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day5';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 5, 'An oligopoly is best described as a market with:', 'mcq', '[{"key":"a","text":"one dominant seller"},{"key":"b","text":"a few large, interdependent firms"},{"key":"c","text":"many firms selling identical products"},{"key":"d","text":"no barriers to entry"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day5';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 6, 'The kinked demand curve model is used to explain:', 'mcq', '[{"key":"a","text":"price rigidity in oligopoly"},{"key":"b","text":"perfect competition pricing"},{"key":"c","text":"monopoly deadweight loss"},{"key":"d","text":"consumer equilibrium"}]'::jsonb, 'a', null from quizzes where slug = 'bba251-day5';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 7, 'Gross Domestic Product (GDP) measures:', 'mcq', '[{"key":"a","text":"income earned by a country''s citizens abroad only"},{"key":"b","text":"the total value of all final goods and services produced within a country''s borders"},{"key":"c","text":"government spending only"},{"key":"d","text":"the money supply"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day5';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 8, 'GNP differs from GDP because GNP:', 'mcq', '[{"key":"a","text":"excludes all foreign income"},{"key":"b","text":"adds net income earned abroad by residents and subtracts income earned domestically by non-residents"},{"key":"c","text":"is always smaller than GDP"},{"key":"d","text":"measures only agricultural output"}]'::jsonb, 'b', null from quizzes where slug = 'bba251-day5';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 9, 'Name the THREE methods used to measure national income.', 'short', null, null, 'The Output method, the Income method, and the Expenditure method.' from quizzes where slug = 'bba251-day5';
insert into questions (quiz_id, position, question_text, question_type, options, correct_answer, model_answer)
select id, 10, 'State the expenditure method formula for national income (using C, I, G, X, and M).', 'short', null, null, 'National Income (Y) = C + I + G + (X − M), where C = consumption, I = investment, G = government spending, X = exports, M = imports.' from quizzes where slug = 'bba251-day5';

