import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "$utils/posts.ts";
import PostsDir from "islands/PostsDir.tsx";
import { ChartColors } from "$fresh_charts/utils.ts";
import Chart from "islands/Chart.tsx";
import { Divisor, PageHead } from "components/mod.ts";

const file = {
  "erasmus22_23": {
    "EBARCELO01": [961.29, 893.31, 886.07],
    "PLISBOA109": [951.18, 933.57],
    "HUBUDAPES12": [930.45, 875.1],
    "CHLAUSANN06": [925.19, 912.78],
    "CHDELEMON02": [912.07],
    "BGENT01": [908.89, 847.11, 846.87],
    "SFTAMPERE17": [889.41],
    "EMADRID05": [879.07],
    "NKONGSBE02": [873.9],
    "PCOIMBRA02": [867.57],
    "FLYON12": [865.26, 858.4],
    "FCOMPIEG01": [860.78, 859.59, 856.01],
    "FBESANCO01": [856.35, 846.07],
    "AWIEN20": [848.76, 836.0, 831.36],
    "EMONDRAG01": [844.08, 840.9],
    "GIOANNIN01": [841.7],
    "FPARIS270": [878.28],
    "SSTOCKHO04": [941.49],
    "FPARIS083": [728.26],
    "EBARCELO03": [820.38],
  },
  "erasmus23_24": {
    "CHLAUSANN06": [962.69, 952.73],
    "BLEUVEN01": [937.12, 889.41],
    "BLIEGE01": [887.82, 922.68],
    "EMONDRAG01": [864.36, 834.54],
    "IRLDUBLIN01": [933.71, 937.2],
    "FLYON12": [951.06, 895.22],
    "FBESANCO01": [849.07, 823.01],
    "PLISBOA109": [957.66, 969.87],
    "BLOUVAIN01": [892.59],
    "DKLYNGBY01": [899.91, 893.64],
    "SFTAMPERE17": [894.58],
    "AWIEN20": [885.43, 872.19, 868.56],
    "PCOIMBRA02": [871.52],
    "BGENT01": [857.01, 854.82, 896.94],
    "EMADRID05": [905.85],
    "IRLCORK01": [941.49],
    "EBARCELO03": [928.95],
    "EBARCELO01": [932.25, 926.31, 908.82],
    "FCOMPIEG01": [837.33, 840.9, 819.06],
    "EPAMPLON02": [839.85],
    "NKONGSBE02": [834.94, 823.01],
    "HUBUDAPES12": [845.46, 821.02],
    "FPARIS270": [875.1],
    "SSTOCKHO04": [905.71],
  },
};

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts("routes/erasmus/posts");
    return ctx.render(posts);
  },
};

export default function Home(props: PageProps<Post[]>) {
  const labels = [
    ...new Set(
      Object.keys(file.erasmus22_23).concat(Object.keys(file.erasmus23_24)),
    ),
  ];
  const data = Object.fromEntries(
    Object.entries(file).map(([key, value]) => [
      key,
      labels.map((label: string) =>
        Object.prototype.hasOwnProperty.call(value, label)
          ? Math.min(...value[label as keyof typeof value])
          : 0
      ),
    ]),
  );
  return (
    <div>
      <PageHead
        title="Erasmus"
        text="This page contains information about the Erasmus programme. Below you can read posts written by students who have finished their Erasmus experience. If you wish to contribute, please contact us and we will tell you how to add your own post."
      />
      <PostsDir posts={props.data} baseUrl={props.url.pathname} />
      <Divisor title="Erasmus statistics" />
      <p className="text-sm font-medium text-left mb-4">
        The following graph shows the minimum score required in previous years
        to be assigned to a particular destination. Open this page from a
        desktop browser if the graph is difficult to visualise.
      </p>
      <div>
        <Chart
          type="bar"
          options={{
            scales: { y: { min: 400 } },
          }}
          data={{
            labels: labels,
            datasets: [
              {
                label: "Year 22-23",
                data: data["erasmus22_23"],
                backgroundColor: ChartColors.Red,
              },
              {
                label: "Year 23-24",
                data: data["erasmus23_24"],
                backgroundColor: ChartColors.Blue,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
