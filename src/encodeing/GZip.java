package encodeing;

import java.io.*;
import java.util.Random;
import java.util.zip.GZIPOutputStream;

/**
 * Created by Administrator on 2017/3/4.
 */
public class GZip {
    private static int MAX = 100000;

    public static void main(String[] args) throws IOException {
        DataStructure[] dataStructures = new DataStructure[MAX];
        DataStructures ds = new DataStructures();
        for (int i = 0; i < dataStructures.length; i ++) {
            DataStructure temp = new DataStructure((int) (Math.random() * MAX), getRandomString(20), Math.random() * MAX);
            dataStructures[i] = temp;
        }
        //test time
        for (int i = 0; i < 6; i++)
            //version1(dataStructures, ds);
            naive(dataStructures);
    }
    //get a random string
    private static String getRandomString(int length) {
        StringBuilder buffer = new StringBuilder("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        int range = buffer.length();
        for (int i = 0; i < length; i ++) {
            sb.append(buffer.charAt(random.nextInt(range)));
        }
        return sb.toString();
    }
    //naive method
    private static void naive(DataStructure[] dataStructures) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        GZIPOutputStream gzipOutputStream = new GZIPOutputStream(byteArrayOutputStream);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(gzipOutputStream);
        long startTime = System.nanoTime();
        for (DataStructure dataStructure : dataStructures) {
            objectOutputStream.writeObject(dataStructure);
        }
        objectOutputStream.flush();
        objectOutputStream.close();
        gzipOutputStream.close();
        long endTime = System.nanoTime();
        System.out.print((endTime-startTime) + "\t");
    }
    //batch method
    private static void version1(DataStructure[] dataStructures, DataStructures ds) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        GZIPOutputStream gzipOutputStream = new GZIPOutputStream(byteArrayOutputStream);
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(gzipOutputStream);
        long startTime = System.nanoTime();
        for (int i = 0; i < dataStructures.length; i++) {
            ds.attr1[i] = dataStructures[i].attr1;
            ds.attr2[i] = dataStructures[i].attr2;
            ds.attr3[i] = dataStructures[i].attr3;
        }
        objectOutputStream.writeObject(ds);
        objectOutputStream.flush();
        objectOutputStream.close();
        gzipOutputStream.close();
        long endTime = System.nanoTime();
        System.out.print((endTime-startTime) + "\t");
    }
}
//abstract data structure sample
class DataStructure implements Serializable{
    int attr1;
    String attr2;
    double attr3;
    DataStructure(int attr1, String attr2, double attr3) {
        this.attr1 = attr1;
        this.attr2 = attr2;
        this.attr3 = attr3;
    }
}
//batch data structure
class DataStructures implements Serializable{
    private static int MAX = 100000;
    int[] attr1 = new int[MAX];
    String[] attr2 = new String[MAX];
    double[] attr3 = new double[MAX];
}